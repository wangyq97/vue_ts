<template>
  <div class="contain">
    <Header :add="add" />
    <List :todos="todos" :updata="updata" :delTodo="delTodo" />
    <Footer
      :todos="todos"
      :allCheck="allCheck"
      :delCheckedTodo="delCheckedTodo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, watch, ref, onMounted } from "vue";
import Header from "./components/Header.vue";
import List from "./components/List.vue";
import Footer from "./components/Footer.vue";
import { Todo } from "./interface/todo";
import { getStorage, setStorage } from "./utils/localStorage";

export default defineComponent({
  name: "app",
  components: {
    Header,
    List,
    Footer,
  },
  setup() {
    const baseData = reactive<{ todos: Array<Todo> }>({
      todos: [],
    });
    onMounted(() => {
      // setTimeout(()=> {
      baseData.todos = getStorage("todos");
      // },1000)
    });
    // 添加todo
    const add = (todo: Todo) => {
      baseData.todos.unshift(todo);
    };
    // 修改todo
    const updata = (todo: Todo, isChecked: boolean) => {
      todo.isChecked = isChecked;
    };
    // 删除todo
    const delTodo = (index: number) => {
      baseData.todos.splice(index, 1);
    };
    // 全选todo
    const allCheck = (check: boolean) => {
      baseData.todos.forEach((todo) => {
        todo.isChecked = check;
      });
    };
    // 删除check
    const delCheckedTodo = () => {
      baseData.todos = baseData.todos.filter((todo) => !todo.isChecked);
    };
    // 监视数据变化 存入缓存中
    watch(
      () => baseData,
      (newVal) => {
        setStorage("todos", baseData.todos);
      },
      { deep: true }
    );

    return {
      ...toRefs(baseData),
      add,
      updata,
      delTodo,
      allCheck,
      delCheckedTodo,
    };
  },
});
</script>

<style scoped >
.contain {
  margin: 0 auto;
  margin-top: 20px;
  width: 600px;
  border: 1px solid #ccc;
  padding: 20px;
  /* font-size: 20px; */
}
</style>
