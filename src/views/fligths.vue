<template>
    <div>
        <v-row>
            <v-col>
                <v-card>
                    <v-toolbar>
                        <v-toolbar-title>Flights</v-toolbar-title>
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
            <v-card dense>
                <v-toolbar dark dense color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{titleDialog}} Flights</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-card-text>
                    <v-form ref="formFlights">
                        <v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="formData.code"
                                    label="Code"
                                    :rules="[$required]"
                                ></v-text-field>
                            </v-col>
                        </v-row>

                        <v-row dense>
                            <v-col cols="12">
                                <v-select
                                    v-model="formData.type"
                                    :items="types"
                                    label="Type"
                                    :rules="[$required]"
                                    dense
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row dense>
                            <v-col cols="12">
                                <v-select
                                    v-model="formData.departure_id"
                                    :items="airports"
                                    label="Departure"
                                    :rules="[$required]"
                                    dense
                                    item-text="name"
                                    item-value="id"
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row dense>
                            <v-col cols="12">
                                <v-select
                                    v-model="formData.destination_id"
                                    :items="airports"
                                    label="Destination"
                                    :rules="[$required]"
                                    item-text="name"
                                    item-value="id"
                                    dense
                                ></v-select>
                            </v-col>
                        </v-row>

                        <v-row dense>
                            <v-col cols="12">
                                <v-select
                                    v-model="formData.airline_id"
                                    :items="airlines"
                                    label="Airline"
                                    :rules="[$required]"
                                    dense
                                    item-text="name"
                                    item-value="id"
                                ></v-select>
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
    name: "Fligths",
    data(){
        return{
            headers: [
                {text: 'Code', value: 'code', sortable: false},
                {text: 'Type', value: 'type', sortable: false},
                {text: 'departure', value: 'departure.name', sortable: false},
                {text: 'destination', value: 'destination.name', sortable: false},
                {text: 'departure time', value: 'departure_time', sortable: false},
                {text: 'Arrival time', value: 'arrival_time', sortable: false},
                {text: 'Airline', value: 'airline.name', sortable: false},
                {text: 'Options', value: 'actions', sortable: false}
            ],
            items: [],
            types: ['PASSENGER', 'FREIGHT'],
            airlines: [],
            airports: [],
            dialog: false,
            overlay: false,
            action: 1,
            formData:{
                code:null,
                type:null,
                departure_id:null,
                destination_id:null,
                departure_time:null,
                arrival_time:null,
                airline_id:null
            }
        }
    }, mounted(){
        this.loadCatalogue();
        this.load();
    }, computed:{
        titleDialog(){
            return this.action == 1 ? "Register" : "Edit"
        }
    }, methods: {
        async loadCatalogue(){
            try{
                let {data} = await this.$http.get("/fligths/catalogue");
                this.airlines = data.airline
                this.airports = data.airports
            }catch(exception){
                console.error(exception);
            }
        },        
        async load(){
            try{
                this.overlay = true;
                let {data} = await this.$http.get("/fligths");
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

            if(this.$refs.formFlights){
                this.$refs.formFlights.resetValidation();
            }
            this.dialog = false;
        },
        async register(){
            try{
                let valid = this.$refs.formFlights.validate();
                if(!valid){
                    return false
                }
                this.overlay = true;
                let {data} = await this.$http.post('/fligths', this.formData);
                this.overlay = false;
                if(!data.success){
                    console.error("error");
                    return;
                }
                this.dialog = false;
            }catch(exception){
                this.overlay = false;
                console.error(exception);
            }
        },
        async update(){
            try{
                let valid = this.$refs.formFlights.validate();
                if(!valid){
                    return false
                }
                this.overlay = true;
                let {data} = await this.$http.put(`/fligths/${this.formData.id}`, this.formData);
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