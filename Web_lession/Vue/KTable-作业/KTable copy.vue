<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in columns" :key="column.label">
          {{column.label}}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in rows" :key="index">
        <td v-for="(value, key) in row" :key="key">
          {{value}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        required: true
      },
    },
    computed: {
      columns() {
        // 可以从内部KTableColumn定义中获取prop和label
        return this.$slots.default.map(({ data }) => ({
          prop: data.attrs.prop,
          label: data.attrs.label
        }))
      },
      rows() {
        return this.data.map(item => {
          const ret = {}
          this.columns.forEach(({prop}) => {
            ret[prop] = item[prop]
          })
          return ret
        })
      }
    },
  }
</script>

<style scoped>

</style>