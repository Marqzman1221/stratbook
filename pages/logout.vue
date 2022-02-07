<script lang="ts">
export default {
  middleware: (context: any) => {
    context.$auth.logout()
  },
}
</script>
