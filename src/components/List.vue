<template>
  <ul class="list_contain">
    <Item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :todo="todo"
      :index="index"
      :updata="updata"
      :delTodo="delTodo"
    />
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Item from "./Item.vue";

export default defineComponent({
  name: "List",
  components: {
    Item,
  },
  props: {
    todos: {
      type: Array,
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
});
</script>

<style scoped >
.list_contain {
  /* padding: 10px 0; */
  border-bottom: 1px solid #ccc;
}
</style>
