<script lang="ts" setup>
import { useConfig, useFrontmatter, usePostProperty } from 'valaxy'
const frontmatter = useFrontmatter()

const config = useConfig()

const { styles, icon, color } = usePostProperty(frontmatter.value.type)
</script>

<template>
  <ValaxySidebar />

  <main class="yun-main flex lt-md:ml-0">
    <div flex="~ 1 col" w="full" p="l-4 lt-md:0">
      <YunCard m="0" p="4" class="page-card sm:p-6 lg:px-12 xl:px-16" :style="styles">
        <slot name="header">
          <YunPageHeader :title="frontmatter.title" :icon="frontmatter.icon || icon" :color="frontmatter.color || color" />
        </slot>
        <template #content>
          <slot name="content">
            <router-view />
          </slot>
        </template>
      </YunCard>

      <slot :frontmatter="frontmatter" />

      <slot name="nav">
        <YunPostNav v-if="frontmatter.nav !== false" />
      </slot>

      <slot v-if="frontmatter.comment !== false" name="comment">
        <YunCard v-if="config.comment.waline.enable" w="full" p="4" class="comment sm:p-8 lg:px-12 xl:px-16" :class="frontmatter.nav === false ? 'mt-4' : 0">
          <YunWaline />
        </YunCard>
      </slot>

      <ValaxyFooter>
        <slot name="footer" />
      </ValaxyFooter>
    </div>

    <slot name="right-sidebar">
      <ValaxyRightSidebar :frontmatter="frontmatter" class="lt-xl:hidden">
        <template #custom>
          <slot name="right-custom" />
        </template>
      </ValaxyRightSidebar>
    </slot>
  </main>

  <YunAlgoliaSearch v-if="config.search.algolia.enable" />
  <YunBackToTop />
</template>

<style lang="scss">
@use '~/styles/mixins' as *;
@include xl {
  .page-card {
    // 8px scrollbar width
    max-width: calc(100vw - 2 * var(--yun-sidebar-width-mobile) - 2rem - 8px);
  }
}
</style>
