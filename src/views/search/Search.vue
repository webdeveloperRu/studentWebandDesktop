<template>
  <vs-row vs-justify="center">
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="8"
      vs-sm="12"
      vs-xs="12"
      class="mb-3"
      code-toggler
    >
      <span
        @click="backToMyproducts"
        style="cursor: pointer; user-select: none"
        class="ml-2 mb-5 mt-2 primary-font"
        ><i class="ti-angle-left" style="font-size: 14px"></i> My Products </span
      >/ Search
    </vs-col>
    <vs-col
      type="flex"
      vs-justify="center"
      vs-align="center"
      vs-lg="8"
      vs-sm="12"
      code-toggler
    >
      <vs-card class="px-3">
        <h3 class="mb-2">Searched: "{{ keyword }}"</h3>
        <div
          v-if="search_result.length == 0"
          style=" font-style: italic; text-align: center"
          class="mt-3"
        >
          No Search Result
        </div>
        <span v-else class="text-muted"
          >Showing {{ search_result.length }} results</span
        >
        <br />
        <br />
        <div
          class="search-item"
          v-for="(search_item, index) in search_result"
          v-bind:key="index"
        >
          <h5
            class="mb-2"
            style="
              color: dodgerblue;
              text-decoration: underline;
              cursor: pointer;
            "
          >
            Search result
          </h5>
          <div class="short-description">
            Lorem ipsum, or lipsum as it is sometimes known, is dummy text used
            in laying out print, graphic or web designs. The passage is
            attributed to an unknown typesetter in the 15th century who is
            thought to have scrambled parts of Cicero's De Finibus Bonorum et
            Malorum for use in a type specimen book. Lorem ipsum, or lipsum as
            it is sometimes known, is dummy text used in laying out print,
            graphic or web designs. The passage is attributed to an unknown
            typesetter in the 15th century who is thought to have scrambled
            parts of Cicero's De Finibus Bonorum et Malorum for use in a type
            specimen book.
          </div>
          <vs-divider></vs-divider>
        </div>
      </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
export default {
  name: "Search",
  data: () => ({
    // instructor_avatar_url: "",
    // keyword: "",
  }),

  computed: {
    keyword: function() {
      var keyword = this.$route.params.query;
      return keyword;
    },

    search_result: {
      get() {
        return this.$store.getters["lessonManage/search_result"];
      },
    },

    notification_text: {
      get() {
        return this.$store.getters["notification_text"];
      },
    },

    notification_icon: {
      get() {
        return this.$store.getters["notification_icon"];
      },
    },

    notification_color: {
      get() {
        return this.$store.getters["notification_color"];
      },
    },
  },

  created() {
   
  },

  methods: {
    backToMyproducts() {
      this.$router.push("/library");
    },
  },
};
</script>
<style>
.search-item .short-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  position: relative;
  --max-lines: 3;
  max-height: calc(var(--lh) * var(--max-lines));
  overflow: hidden;
  padding-right: 1rem;
}

.search-item .short-description::before {
  position: absolute;
  content: "";
  inset-block-end: 0; /* "bottom" */
  inset-inline-end: 0;
}
.search-item .short-description::after {
  content: "";
  position: absolute;
  inset-inline-end: 0; /* "right" */
  width: 1rem;
  height: 1rem;
  background: white;
}
</style>
