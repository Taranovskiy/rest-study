import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js';

Vue.component('loader', {
  template: `
    <div style="display: flex; justify-content: center; align-items: center;">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</>
      </div>
    </div>
  `,
})

new Vue({
  el: '#app',
  data: () => ({
    form: {
      name: '',
      value: '',
    },
    contacts: [],
    loading: false,
  }),
  computed: {
    canCreateCard() {
      return this.form.name.trim() && this.form.value.trim();
    },
  },
  async mounted() {
    this.loading = true;
    this.contacts = await request('/api/contacts');
    this.loading = false;
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
});

async function request(url, method = 'GET', data = null) {
  try {
    const headers = {};
    let body;

    if (data) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      headers,
      body,
    });
    return await response.json();
  } catch (error) {
    console.warn('Error: ', error.message);
  }
}