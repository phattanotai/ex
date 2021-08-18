export default {
    base64_encode(str) {
        return Buffer.from(str).toString('base64');
    },
    base64_decode(str) {
        return Buffer.from(str, 'base64').toString();
    }

}