import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

new Vue({
  el: '#app',
  data: () => ({
    form: {
      name: '',
      value: '',
    },
    contacts: []
  }),
  computed: {
    canCreateCard() {
      return this.form.name.trim() && this.form.value.trim();
    },
  },
  methods: {
    createContact() {
      const {...contact} = this.form;
      this.contacts.push({...contact, id: Date.now(), marked: false});
      this.form.name = this.form.value = '';
    },
    markContact(id) {
      const contact = this.contacts.find(el => el.id === id);
      contact.marked = true;
    },
    removeContact(id) {
      this.contacts = this.contacts.filter(el => el.id !== id);
    }
  },
})