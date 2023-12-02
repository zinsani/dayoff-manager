<template>
  <q-page>
    <div class="row q-px-md q-pt-md" style="gap: 2rem">
      <MyUsage class="col-md col-xs-12"></MyUsage>
      <WorkOnHolidays class="col-md col-xs-12"></WorkOnHolidays>
      <ProjectList class="col-md col-xs-12"></ProjectList>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MyUsage from 'src/components/MyUsage.vue';
import WorkOnHolidays from 'src/components/WorkOnHolidays.vue';
import ProjectList from 'src/components/ProjectList.vue';
</script>
