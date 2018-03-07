<template>
    <div id="main_view" v-if="this.$store.getters.get_interface === 'main_view'" v-cloak v-bind:class="{ with_form : show_form }">
        <MainHeader :show_class=show_class :show_form=show_form :userpic=userpic :search_t=search_term :no_results=no_results
                    @searchData="lookForData" @navBack="goBack"/>
        <MainBody :show_class=show_class :filtered_data=filtered_data
                  :active_tab=active_tab :active_article=active_article :active_article_data=current_opened_article
                  @setTab="changeActiveTab" @setArticle="changeActiveArticle" @save_line="saveLine"
                  @save_item = "saveItem" @save_element="saveElement" @line_up="lineUp" @line_down="lineDown"
                  @line_remove="lineRemove" @save_all_data="saveAllData" @remove_folder="removeFolder"/>
    </div>
</template>

<script>

    import MainHeader from './MainHeader'
    import MainBody from './MainBody'

    const axios = require('axios');

    export default {
        name: 'AppInside',
        data: () => {
            return {
                show_form: false,
                userpic: null,
                userdata: null,
                search_term: '',
                no_results: false,
                show_class: 1,
                active_tab: 0,
                active_article: 0,
                active_article_data: null
            }
        },
        components: { MainHeader, MainBody },
        props: {

        },
        methods: {
            lookForData(word){
                this.search_term = word.toLowerCase();
                this.active_tab = 0;
                this.active_article = 0;
                this.show_class = 1;
            },
            changeActiveTab(index){
                this.active_tab = index;
                this.active_article = 0;
                this.show_class = 2;
            },
            changeActiveArticle(index){
                this.active_article = index;
                this.show_class = 3;
            },
            saveItem(text,level){
                let vm = this, userdata = vm.filtered_data;

                switch(level){
                    case 1 :
                        this.$set(
                            userdata.folders,
                            userdata.folders.length,
                            { title: text, items: [] }
                            );
                        this.active_tab = userdata.folders.length - 1;
                        this.active_article = 0;
                        break;
                    case 2:
                        this.$set(
                            userdata.folders[this.active_tab].items,
                            userdata.folders[this.active_tab].items.length,
                            { caption: text, data: [], description: '', normal_value:null, unit: '' }
                            );
                        this.active_article = userdata.folders[this.active_tab].items.length - 1;
                        break;
                }
                this.saveAllData();
            },
            saveElement(text,element){
                let vm = this, userdata = vm.filtered_data;

                switch(element){
                    case 1 :
                        this.$set(
                            userdata.folders[this.active_tab].items[this.active_article],
                            "caption",
                            text
                        );
                        break;
                    case 2:
                        this.$set(
                            userdata.folders[this.active_tab].items[this.active_article],
                            "description",
                            text
                        );
                        break;
                }
                this.saveAllData();
            },
            saveLine(date,value,order=null){
                let vm = this, userdata = vm.filtered_data;

                if(order===null){
                    userdata.folders[this.active_tab].items[this.active_article].data.push({"date":date,"value":value});
                }
                else {
                    this.$set(
                        userdata.folders[this.active_tab].items[this.active_article].data,
                        order,
                        {"date":date,"value":value}
                    );
                }
                this.saveAllData();
            },
            lineUp(order){
                let vm = this, userdata = vm.filtered_data;

                if(order){
                    let data_temp = this.swap(userdata.folders[vm.active_tab].items[vm.active_article].data, order-1, order);

                    this.userdata.folders[vm.active_tab].items[vm.active_article].data =
                        Object.assign([], this.userdata.folders[vm.active_tab].items[vm.active_article].data,data_temp);
                }
                this.saveAllData();
            },
            lineDown(order){
                let vm = this, userdata = vm.filtered_data;

                if( order < userdata.folders[vm.active_tab].items[vm.active_article].data.length - 1 ){
                    let data_temp = this.swap(userdata.folders[vm.active_tab].items[vm.active_article].data, order+1, order);

                    this.userdata.folders[vm.active_tab].items[vm.active_article].data =
                        Object.assign([], this.userdata.folders[vm.active_tab].items[vm.active_article].data,data_temp);
                }
                this.saveAllData();
            },
            lineRemove(order){
                let vm = this, userdata = vm.filtered_data;
                userdata.folders[this.active_tab].items[this.active_article].data.splice(order,1);
                this.saveAllData();
            },
            removeFolder(order,nav){
                let vm = this, userdata = vm.filtered_data, data_to_delete, data_title;
                switch(nav){
                    case 1: data_to_delete = userdata.folders[order]; data_title = data_to_delete.title; break;
                    case 2: data_to_delete = userdata.folders[vm.active_tab].items[order]; data_title = data_to_delete.caption; break;
                }
                if (confirm('Do you really want to delete whole section ' + data_title + '?')) {
                    switch(nav){
                        case 1: userdata.folders.splice(order,1); break;
                        case 2: userdata.folders[vm.active_tab].items.splice(order,1); break;
                    }
                    this.saveAllData();
                }
            },
            saveAllData(){
                let vm = this, userdata = vm.userdata;
                console.log('Ajax saving should be here, ',userdata);
            },
            goBack(){
                this.show_class = this.show_class - 1;
            },
            highlight(text){
                let result = text.replace(this.search_term, (w)=>`<span class="highlighted">${w}</span>`);
                if(result === text){
                    result = text.replace(this.jsUcfirst(this.search_term), (w)=>`<span class="highlighted">${w}</span>`);
                }
                return result
            },
            jsUcfirst(string)
            {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },
            swap(obj,order1,order2){
                let a = obj[order2];
                obj[order2] = obj[order1];
                obj[order1] = a;
                return obj;
            },
            componentDidMount(){

            }
        },
        computed: {
            filtered_data: function(){
                let vm = this, result = {}, heap = [];

                for ( let val of this.userdata.folders ) {
                    if (val.title.toLowerCase().indexOf(vm.search_term) > -1) {
                        heap = [...heap, val]
                    } else {
                        let subitems = val.items.filter((i)=>{
                            return (i.caption.toLowerCase().indexOf(vm.search_term) > -1 ||
                                i.description.toLowerCase().indexOf(vm.search_term) > -1)
                        });

                        if (subitems.length){
                            let newobject = {
                                title: val.title,
                                items: subitems
                            };
                            heap = [...heap, newobject]
                        }
                    }
                }

                result.folders = heap;

                vm.no_results = !result.folders.length;

                return vm.no_results ? vm.userdata : result
            },
            current_opened_article: function(){
                let vm = this;
                return vm.filtered_data.folders[vm.active_tab].items[vm.active_article]
            }
        },

        mounted: function(){
            let vm = this;
            // Should get data from backend
            axios.get('https://randomuser.me/api/', {
                params: { dataType: 'json' }
            })
                .then((response) => {
                    this.$set(vm, 'userpic', 'url('+ response.data.results[0].picture['medium'] +')');
                })
                .catch((error) => {
                    console.log(error);
                });

            let fakejson = {
                "folders" : [
                    {
                        "title" : "Health Info",
                        "items" : [
                            {
                                "caption" : "Weight",
                                "description" : "W123 Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
                                "data" : [
                                    { "date" : "2016-02-08", "value": "86.4" },
                                    { "date" : "2016-09-09", "value": "84" },
                                    { "date" : "2016-07-10", "value": "83.9" },
                                    { "date" : "2016-08-01", "value": "84.2" }
                                ],
                                "unit" : "kg",
                                "normal_value" : null
                            },
                            {
                                "caption" : "Haemoglobin",
                                "description" : "H123 Hhhh Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
                                "data" : [
                                    { "date" : "2016-11-08", "value": "114" },
                                    { "date" : "2016-11-14", "value": "112" },
                                    { "date" : "2016-12-01", "value": "100" },
                                    { "date" : "2016-12-18", "value": "101" }
                                ],
                                "unit" : "M",
                                "normal_value" : {
                                    "min": "110",
                                    "max": "113"
                                }
                            }
                        ]
                    },
                    {
                        "title" : "Other Info",
                        "items" : []
                    },
                    {
                        "title" : "Other Info 2",
                        "items" : [
                            {
                                "caption" : "Blood pressure",
                                "description" : "Bp 123 Bbb Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
                                "data" : [
                                    { "date" : "2016-06-08", "value": "100/90" },
                                    { "date" : "2016-07-08", "value": "110/95" },
                                    { "date" : "2016-10-10", "value": "140/120" },
                                    { "date" : "2016-11-01", "value": "105/75" }
                                ],
                                "unit" : "xxx",
                                "normal_value" : {
                                    "text" : "120/80"
                                }
                            }
                        ]
                    }
                ]
            };

            this.$set(vm, 'userdata', fakejson); // Should get data from backend

        },
        beforeMount: function(){
            let vm = this;
            vm.show_class = 1;
        },
    }

</script>

<style scoped>

</style>
