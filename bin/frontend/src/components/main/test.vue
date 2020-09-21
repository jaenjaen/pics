<template>
  <div>{{ width }}, {{ height }}</div>
</template>

<script>
export default {
  data() {
    return {
      width: 0,
      height: 0
    };
  },
  mounted() {
    // console.log("ready...");
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // console.log("beforeDestroy...");
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize(event) {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }
  }
};
</script>