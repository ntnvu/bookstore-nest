import { Injectable } from '@nestjs/common';
import axios from "axios";

@Injectable()
export class HeroiclabsService {
    async connectHeroic({create, heroic_user_uuid}) {
        console.log(`${process.env.HEROIC_URL}/account/authenticate/custom?create=true`);
        
        try {
            const defaultkey = Buffer.from("defaultkey:").toString('base64');
            return axios({
                method: 'post',
                url: `${process.env.HEROIC_URL}/account/authenticate/custom?create=${create}`,
                data: {
                    "id": heroic_user_uuid,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${defaultkey}`
                }
            }).then(res => {
                console.log(res.data.token);
                return res.data.token;
            });
        }
        catch (err) {
            throw err;
        }
    }
}
