<template>
    <tr>
        <td>{{ activeArticleDataItem.date }}</td>
        <td>{{ activeArticleDataItem.value }} {{ unit }}</td>
        <td v-if="normal_value != null">
            <span v-if="activeArticleDataItem.value < normal_value.min">L</span>
            <span v-if="activeArticleDataItem.value > normal_value.max">H</span>
        </td>
        <td v-if="normal_value != null">
            <span v-if="normal_value.text">{{ normal_value.text }}</span>
            <span v-else>{{ normal_value.min }} - {{ normal_value.max }}</span>
        </td>
    </tr>
</template>
<script>
    export default {
        name: 'TableLine',
        props: {
            activeArticleDataItem:Object,
            unit:String,
            normal_value:Object,
        }
    }
</script>
<style scoped>
    td:last-child {
        text-align: right;
    }
</style>