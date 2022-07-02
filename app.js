
const Counter = {
  data() {
    return {
      list: JSON.parse(localStorage.getItem('memo')),
      text: ""
    }
  },
  methods: {
    addMemo() {
      const text = this.text
      let index = 1
      if (this.list.length > 0) {
        const size = this.list.length - 1
        index = this.list[size].index + 1
      }
      this.list.push({ index: index, text: this.text })
      localStorage.setItem('memo', JSON.stringify(this.list))
    },
    updateMemo(index) {

    },
    removeMemo(index) {
      this.list.splice((index - 1), 1)
      this.list.forEach((item, i) => {
        item.index = i + 1
      });
      localStorage.setItem('memo', JSON.stringify(this.list))
    }
  }
}

Vue.createApp(Counter).mount('#memo')
