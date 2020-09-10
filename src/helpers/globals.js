import axios from "axios";

const config = require('../config.json')

export async function getSiteOptions(key) {
    return await axios.get(`${config.server}/options/${key}`).then((resp) => {
        return resp.data.value
    })
}