<template>
  <div class="header_contain">
    <input
      class="header_input"
      type="text"
      v-model="title"
      placeholder="请输入..."
      @keydown.enter="addTodo"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Todo } from "../interface/todo";

export default defineComponent({
  name: "Header",
  props: {
    add: {
      type: Function,
      required:true
    },
  },
  setup(props) {
    // 创建响应式数据
    const title = ref("");
    const addTodo = () => {
      // 获取ref对象的值
      const text = title.value.trim();
      if(!text)return
      const todo: Todo = {
        id: Date.now(),
        title: text,
        isChecked: false,
      };
      props.add(todo)
      title.value = ''
    };
    return {
      title,
      addTodo,
    };
  },
});
</script>

<style scoped >
.header_contain {
  padding: 10px 0;
}
.header_input {
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  height: 40px;
}
</style>
