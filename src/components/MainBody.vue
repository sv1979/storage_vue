<template>
    <div v-bind:class="[{
        'mv':true,
        'edit_mode_activated' :edit_mode,
        'show_class_1': show_class===1,
        'show_class_2': show_class===2,
        'show_class_3': show_class===3
      }]">
        <aside class="mv_aside">
            <div class="subnav_inner">
                <draggable v-if="filtered_data.folders.length" v-model="filtered_data.folders" @end="saveNewPositions">
                    <NavItem v-for="(item,index) in filtered_data.folders"  v-bind:key=index v-bind:navItem="item"
                             v-bind:order="index" :nav_index="1" v-bind:edit_nav="edit_nav"
                             :active_tab="active_tab" :active_article="active_article"
                             :is_active="active_tab===index"
                             v-bind:all_data="filtered_data" @removeNavItem="removeNavItem" :initial_show="true"
                             @set_active_tab="set_active_tab" @set_active_article="set_active_article"
                             @saveNavItem="saveNavItem" />
                </draggable>
                <AddPiece button_text="Add item" v-bind:level="1" @save_piece = "saveItem" />
            </div>
            <div class="list_controls">
                <button class="styled_button" v-on:click="editNav(1)">
                    <font-awesome-icon :icon="['fal','pencil']" />
                </button>
            </div>
        </aside>

        <aside class="mv_subnav">
            <div class="subnav_inner">
                <draggable v-if="filtered_data.folders && filtered_data.folders[active_tab]" v-model="filtered_data.folders[active_tab].items" @end="saveNewPositions">
                    <NavItem v-for="(item,index) in filtered_data.folders[active_tab].items"  v-bind:key=index
                             v-bind:navItem="item"
                             v-bind:order="index" :nav_index="2" v-bind:edit_nav="edit_nav"
                             :active_tab="active_tab" :active_article="active_article"
                             :is_active="active_article===index"
                             v-bind:all_data="filtered_data" @removeNavItem="removeNavItem" :initial_show="true"
                             @set_active_tab="set_active_tab" @set_active_article="set_active_article"
                             @saveNavItem="saveNavItem" />
                </draggable>
                <AddPiece v-if="filtered_data.folders.length" button_text="Add item" v-bind:level="2" @save_piece = "saveItem" />
            </div>

            <div class="list_controls">
                <button class="styled_button" v-on:click="editNav(2)">
                    <font-awesome-icon :icon="['fal','pencil']" />
                </button>
            </div>

        </aside>

        <main class="mv_main">

            <article class="mv_article" v-if="active_article_data == null">
                <header>No data</header>
            </article>
            <article class="mv_article" v-else>
                <header class="with_edit_button">
                    <span v-html="highlightText(active_article_data.caption)"></span>
                    <TextEditForm v-bind:element="1" v-bind:reference_text=active_article_data.caption
                                  @save_element = "saveElement" ref="headerEditForm" />
                </header>

                <div class="table_data" >
                    <TableEditForm ref="tableEditForm"
                                   v-bind:reference_text=active_article_data.unit
                                   v-bind:reference_norm=active_article_data.normal_value
                                    @save_table_settings="saveTableSettings"/>
                    <table>
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Value</th>
                            <th v-if="active_article_data.normal_value != null"></th>
                            <th v-if="active_article_data.normal_value != null">Normal value</th>
                            <th></th>
                        </tr>
                        </thead>

                        <draggable v-model="active_article_data.data" :element="'tbody'" @end="saveNewPositions">
                            <TableLine v-for="(item,index) in active_article_data.data"
                                       v-bind:key="index" v-bind:activeArticleDataItem="item" v-bind:unit="active_article_data.unit"
                                       v-bind:normal_value="active_article_data.normal_value"
                                       v-bind:order="index" :lastloop="index===active_article_data.data.length - 1"
                                       @save_line="saveLine" @line_up="lineUp" @line_down="lineDown" @line_remove="lineRemove"
                                       />
                        </draggable>

                    </table>

                    <AddTableLine @save_line="saveLine" :show_reorder="false" ref="tableLineForm"/>
                </div>

                <footer class="with_edit_button">
                    <span v-html="highlightText(active_article_data.description)"></span>
                    <TextEditForm v-bind:element="2" v-bind:reference_text=active_article_data.description
                                  @save_element = "saveElement" ref="footerEditForm"  />
                </footer>
            </article>
        </main>
    </div>
</template>

<script>
    import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
    import AddPiece from './AddPiece'
    import TextEditForm from './TextEditForm'
    import TableEditForm from './TableEditForm'
    import TableLine from './TableLine'
    import AddTableLine from './AddTableLine'
    import NavItem from './NavItem'
    import draggable from 'vuedraggable'

    export default {
        name: 'MainBody',
        beforeCreate () {

        },
        props: {
            edit_mode: Boolean,
            show_class:Number,
            active_tab:Number,
            active_article:Number,
            filtered_data: Object,
            active_article_data: Object
        },
        data: () => {
            return {
                this_search: null,
                edit_nav: 0,
                tab_switched: false
            }
        },

        methods: {
            set_active_tab(index){
                this.$emit('setTab',index);
            },
            set_active_article(index){
                this.$emit('setArticle',index);
            },
            highlightText(text){
                return this.$parent.highlight(text)
            },
            saveItem(text,level){
                this.$emit('save_item', text,level);
            },
            saveElement(text,element){
                this.$emit('save_element', text,element);
            },
            saveLine(date,value,order){
                this.$emit('save_line', date,value,order);
            },
            lineUp(order){
                this.$emit('line_up', order);
            },
            lineDown(order){
                this.$emit('line_down', order);
            },
            lineRemove(order){
                this.$emit('line_remove', order);
                this.$forceUpdate();
            },
            saveTableSettings(settings){
                this.$emit('save_table_settings', settings);
            },
            saveNewPositions: function(){
                this.$emit('save_all_data');
                this.$forceUpdate();
            },
            editNav: function(order){
                switch(order){
                    case 1:
                        this.edit_nav = this.edit_nav === 1 ? 0 : order; break;
                    case 2:
                        this.edit_nav = this.edit_nav === 2 ? 0 : order; break;
                }
            },
            removeNavItem: function(ordernumber,nav){
                this.$emit('remove_folder', ordernumber, nav);
                this.$forceUpdate();
            },
            saveNavItem: function(text,nav,order){
                this.$emit('save_nav_item',text,nav,order);
                this.$forceUpdate();
            },
            editNavItem: function(){

            },
            tabSwitch: function(value){
                this.tab_switched = value;
            }
        },
        components: {
            FontAwesomeIcon,
            AddPiece,
            TextEditForm,
            TableEditForm,
            TableLine,
            AddTableLine,
            NavItem,
            draggable
        },
        computed: {

        },
        mounted: function(){

        },
        watch: {
            tab_switched: function(){
                if(this.$refs.headerEditForm){
                    this.$refs.headerEditForm.tabSwitch(true);
                }
                if(this.$refs.footerEditForm){
                    this.$refs.footerEditForm.tabSwitch(true);
                }
                if(this.$refs.tableEditForm){
                    this.$refs.tableEditForm.tabSwitch(true);
                }
                if(this.$refs.tableLineForm){
                    this.$refs.tableLineForm.hideForm();
                    this.$refs.tableLineForm.tabSwitch(true);
                }
                this.tab_switched = false;
            }
        },
    }
</script>

<style scoped>
    table {
        margin-bottom: 1rem;
    }
    th:last-child {
        width: 3rem;
    }
    td:first-child, th:first-child {
        padding-left: 0;
    }
    td:nth-last-child(2), th:nth-last-child(2), td:last-child, th:last-child {
        text-align: right;
    }
</style>
