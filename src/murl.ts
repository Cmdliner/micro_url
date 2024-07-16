import { nanoid } from "nanoid"
import { redisClient } from "./config/db";


export interface MurlObj {
    _id: string;
    original_url: string;
    endpoint: string;
}

export const createMurl = async (original_url: string): Promise<MurlObj | null> => {
    const murl_endpoint = nanoid();
    const murl_id = await redisClient.incr('murl:id');

    const murl_obj: MurlObj = { _id: murl_id.toString(), original_url, endpoint: murl_endpoint };

    try {
        await redisClient.hSet(`murl:${murl_id}`, murl_obj as any);
        await redisClient.sAdd('murls', murl_id.toString());
    } catch (error) {
        throw new Error('Could not create murl')
    }
    
    return murl_obj;
}

export const decodeMurl = async (murl_endpoint: string): Promise<string | null> => {
    try {
        const murl_ids = await redisClient.sMembers('murls');
        for (const id of murl_ids) {
            const murl = await redisClient.hGetAll(`murl:${id}`)
            if(murl.endpoint === murl_endpoint) {
                return murl.original_url;
            }
        }
    } catch (error) {
        throw new Error('Error fetching murl');
    }
    return null;
}