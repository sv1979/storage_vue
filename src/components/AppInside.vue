<template>
    <div id="main_view" v-if="this.$store.getters.get_interface === 'main_view'" v-cloak v-bind:class="{ with_form : show_form }">
        <MainHeader :show_class=show_class :show_form=show_form :userpic=userpic :search_t=search_term :no_results=no_results
                    @searchData="lookForData" @navBack="goBack"/>
        <MainBody :show_class=show_class :filtered_data=filtered_data
                  :active_tab=active_tab :active_article=active_article :active_article_data=current_opened_article
                  @setTab="changeActiveTab" @setArticle="changeActiveArticle" @save_item = "saveItem" @save_element="saveElement" />
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
                let vm = this, userdata = vm.userdata;

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
                console.log('Ajax saving should be here, ',userdata);
            },
            saveElement(text,element){
                let vm = this, userdata = vm.userdata;

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
            componentDidMount(){

            }
        },
        computed: {
            filtered_data: function(){
                let vm = this, result = {}, heap = [];

                for ( let val of vm.userdata.folders ) {
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
                                    { "date" : "18/11/2016", "value": "86.4" },
                                    { "date" : "10/01/2017", "value": "84" },
                                    { "date" : "05/03/2017", "value": "83.9" },
                                    { "date" : "15/03/2017", "value": "84.2" }
                                ],
                                "unit" : "kg",
                                "normal_value" : null
                            },
                            {
                                "caption" : "Haemoglobin",
                                "description" : "H123 Hhhh Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit",
                                "data" : [
                                    { "date" : "20/11/2016", "value": "114" },
                                    { "date" : "10/01/2017", "value": "112" },
                                    { "date" : "05/03/2017", "value": "100" },
                                    { "date" : "10/03/2017", "value": "101" }
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
                                    { "date" : "18/11/2016", "value": "100/90" },
                                    { "date" : "10/01/2017", "value": "110/95" },
                                    { "date" : "05/03/2017", "value": "140/120" },
                                    { "date" : "15/03/2017", "value": "105/75" }
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
        }
    }
</script>

<style scoped>

</style>
