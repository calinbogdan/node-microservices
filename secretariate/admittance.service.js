const axios = require("axios");

const admittanceClient = axios.default.create({
  url: "http://localhost:5015"  
});

module.exports = {
    getSessions: async () => {
        return (await admittanceClient.get("/sessions")).data;
    },
    getCandidatesForSessionAsync: async (sessionId) => {
        return (await admittanceClient.get(`/sessions/${sessionId}/candidates`)).data;       
    }
};