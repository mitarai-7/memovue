const MemoListItem = {
  data() {
    return {
      text: this.memo.text,
      editing: false
    }
  },
  props: ['memo'],
  emits:['update', 'remove'],
  template: `
<li>
<div v-if="editing">
  <input type="text" v-model="text">
  <div class="command">
    <button class="button-primary" v-on:click="$emit('update', {'id':this.memo.id, 'text':this.text});editing = false">確定</button>
  </div>
</div>
<div v-else>
  {{memo.text}}
  <div class="command">
    <button class="button-primary" v-on:click="editing = true">修正</button>
    <button class="button-primary" v-on:click="$emit('remove', this.memo.id)">削除</button>
  </div>
</div>
</li>
`
}

const MemoInput = {
  data(){
    return {
      text: ""
    }
  },
  emits: ['add'],
  template: `
<input type="text" v-model="text">
<div class="command">
  <button class="button-primary" v-on:click="$emit('add', text);text=''">追加</button>
</div>
`
}

const app = Vue.createApp({
  data() {
    const memos = localStorage.getItem('memo') ? JSON.parse(localStorage.getItem('memo')) : []
    return {
      list: memos
    }
  },
  methods: {
    addMemo(text) {
      this.list.push({'text': text})
      this.list.forEach((x,i) => { x.id = i });
      localStorage.setItem('memo', JSON.stringify(this.list))
    },
    updateMemo(memo) {
      this.list.splice(memo.index, 1, memo)
      localStorage.setItem('memo', JSON.stringify(this.list))
    },
    removeMemo(id) {
      this.list.splice(id, 1)
      this.list.forEach((x,i) => { x.id = i });
      localStorage.setItem('memo', JSON.stringify(this.list))
    }

  },
  components: {
    MemoListItem,
    MemoInput
  }
})


app.mount('#memo')
