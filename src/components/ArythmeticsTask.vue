<template>
  <div>{{ problem }} = {{ answer }}</div>
</template>

<script>
export default {
  name: "ArythmeticsTask",
  props: {
    problem: String,
    answer: String,
  },
};
</script>