<template>
  <li
    class="item_contain"
    :class="{ active: isActive }"
    @mouseenter="changeColor(true)"
    @mouseleave="changeColor(false)"
  >
    <label>
      <input type="checkbox" v-model="checked" />
      <span class="title">{{ todo.title }}</span>
    </label>
    <button @click="deleteTodo">删除</button>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Todo } from "../interface/todo";

export default defineComponent({
  name: "Item",
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updata: {
      type: Function,
      required: true,
    },
    delTodo: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const isActive = ref(false);
    const changeColor = (flag: boolean) => {
      isActive.value = flag;
    };
    // 是否选中
    const checked = computed({
      get() {
        return props.todo.isChecked;
      },
      set(val: boolean) {
        props.updata(props.todo, val);
      },
    });
    const deleteTodo = () => {
      props.delTodo(props.index);
    };
    return {
      isActive,
      changeColor,
      checked,
      deleteTodo,
    };
  },
});
</script>

<style scoped >
.item_contain {
  box-sizing: border-box;
  width: 100%;
  border: 1px solid #ccc;
  border-bottom: none;
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  /* background-color: #f00;; */
}
.title {
  margin-left: 10px;
}
button {
  width: 60px;
  background-color: #f00;
  border: 1px solid #f00;
  color: #fff;
}
.active {
  background-color: deepskyblue;
}
</style>
