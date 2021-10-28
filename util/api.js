export default {
  async fetch(endpoint, data) {
    return await this.$axios.post(`/api/${endpoint}`, data)
  },

  async createUpdate(endpoint, data) {
    return await this.$axios.post(`/api/${endpoint}/createupdate`, data)
  },

  async read(endpoint, id) {
    return await this.$axios.get(`/api/${endpoint}/${id}`)
  },

  async readUuid(endpoint, data) {
    return await this.$axios.post(`/api/${endpoint}/uuid`, data)
  },

  async delete(endpoint, data) {
    return await this.$axios.post(`/api/${endpoint}/delete`, data)
  },

  async valueList(endpoint, data) {
    return await this.$axios.post(`api/${endpoint}/valuelist`, data)
  },

  async duplicateCheck(endpoint, data) {
    return await this.$axios.post(`api/${endpoint}/duplicatecheck`, data)
  },
}
