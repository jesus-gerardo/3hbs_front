<template>
    <div>
        <v-row>
            <v-col>
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Airlines</v-toolbar-title>
                        <v-spacer></v-spacer>
                            <v-btn fab small elevation="4" color="success" @click="open()">
                                <v-icon>mdi-plus</v-icon>
                            </v-btn>
                    </v-toolbar>

                    <v-card-text>
                        <v-data-table
                            fixed-header
                            calculate-widths
                            :headers="headers"
                            :items="items"
                            :items-per-page="5"
                            class="elevation-3"
                        >
                            <template v-slot:[`item.actions`]="{item}">
                                <v-menu bottom :close-on-click="true">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn dark icon v-bind="attrs" v-on="on">
                                        <v-icon color="grey" v-on="on">
                                            mdi-dots-vertical
                                        </v-icon>
                                    </v-btn>
                                </template>

                                <v-list>
                                    <v-list-item @click="open(item)">
                                        <v-list-item-title>
                                            <v-icon color="blue"> mdi-pencil </v-icon>
                                            Edit
                                        </v-list-item-title>
                                    </v-list-item>

                                    <v-list-item @click="destroy(item)">
                                        <v-list-item-title>
                                            <v-icon color="red">mdi-delete-forever</v-icon>
                                            Delete
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                                </v-menu>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>

        <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition" width="500">
            <v-card>
                <v-toolbar dark dense color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{titleDialog}} Airlines</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text>
                    <v-form ref="formAirlines">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="formData.name"
                                    label="Name"
                                    :rules="[$required]"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="formData.code"
                                    label="Code"
                                    :rules="[$required]"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="close()">Cancel</v-btn>
                    <v-btn v-if="action == 1" color="success" @click="register()">Save</v-btn>
                    <v-btn v-else-if="action == 0" color="success" @click="update()">Update</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-overlay :value="overlay" :z-index="9999">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <!-- <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular> -->
    </div>
</template>

<script>
export default {
    name: "Airlines",
    data(){
        return{
            headers: [
                {text: 'Name', value: 'name', sortable: false},
                {text: 'Code', value: 'code', sortable: false},
                {text: 'Options', value: 'actions', sortable: false}
            ],
            items: [],
            dialog: false,
            overlay: false,
            action: 1,
            formData:{
                name: null,
                code:null,
            }
        }
    }, mounted(){
        this.load();
    }, computed:{
        titleDialog(){
            return this.action == 1 ? "Register" : "Edit"
        }
    }, methods: {
        async load(){
            try{
                this.overlay = true;
                let {data} = await this.$http.get("/airlines");
                this.overlay = false;
                this.items = data.data;
            }catch(exception){
                this.overlay = false;
                console.error(exception);
            }
        },
        open(row = null){
            this.action = 1;
            if(row != null){
                this.action = 0;
                this.formData = Object.assign({}, row);
            }
            this.dialog = true;
        },
        close(){
            for(let key in this.formData){
                this.formData[key] = null;
            }
            if(this.$refs.formAirlines){
                this.$refs.formAirlines.resetValidation();
            }
            this.dialog = false;
        },
        async register(){
            try{
                let valid = this.$refs.formAirlines.validate();
                if(!valid){
                    return false
                }
                this.overlay = true;
                let {data} = await this.$http.post('/airlines', this.formData);
                this.overlay = false;
                if(!data.success){
                    console.error("error");
                    return;
                }
                this.close();
                this.load();
            }catch(exception){
                this.overlay = false;
                console.error(exception);
            }
        },
        async update(){
            try{
                let valid = this.$refs.formAirlines.validate();
                if(!valid){
                    return false
                }
                this.overlay = true;
                let {data} = await this.$http.put(`/airlines/${this.formData.id}`, this.formData);
                this.overlay = false;
                if(!data.success){
                    console.error("error");
                    return;
                }
                this.close();
                this.load();
            }catch(exception){
                this.overlay = false;
                console.error(exception);
            }
        },
        async delete(){

        }
    }

}
</script>

<style>

</style>