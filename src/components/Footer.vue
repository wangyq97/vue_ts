<template>
  <!-- <h2>我是footer组件</h2> -->
  <div class="footer_contain">
    <label>
      <input type="checkbox" v-model="check" />
      <span style="margin-left: 10px">已选择{{ count }}</span
      >/
      <span>全部{{ todos.length }}</span>
    </label>
    <button @click="delCheckedTodo">清除已选择</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Todo } from "../interface/todo";

export default defineComponent({
  name: "Footer",
  props: {
    todos: {
      type: Array as () => Array<Todo>,
      required: true,
    },
    allCheck: {
      type: Function,
      required: true,
    },
    delCheckedTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const count = computed(() => {
      return props.todos.reduce((pre, todo) => {
        return (pre += todo.isChecked ? 1 : 0);
      }, 0);
    });
    const check = computed({
      get() {
        return count.value === props.todos.length;
      },
      set(val) {
        props.allCheck(val);
      },
    });
    // const delAll = () => {
    //   props.delCheckedTodo()
    // }
    return {
      count,
      check,
      // delAll
    };
  },
});
</script>

<style scoped >
.footer_contain {
  border: 1px solid #ccc;
  height: 40px;
  margin: 10px 0;
  line-height: 40px;
  display: flex;
  padding-left: 20px;
  justify-content: space-between;
}
button {
  border: 1px solid #f00;
  background-color: #f00;
}
</style>
