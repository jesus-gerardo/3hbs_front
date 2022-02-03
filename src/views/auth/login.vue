<template>
    <v-main>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-card class="elevation-12" min-width="450">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    
                    <v-card-text>
                        <v-form>
                            <v-text-field
                                prepend-icon="mdi-account"
                                v-model="email"
                                label="Email"
                                type="text"
                            ></v-text-field>

                            <v-text-field
                                prepend-icon="mdi-lock"
                                v-model="password"
                                label="Password"
                                type="password"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="success" @click="login">Login</v-btn>
                    </v-card-actions>
                </v-card>
            </v-layout>
        </v-container>
    </v-main>
</template>

<script>
    export default {
        name:"Login",
        data(){
            return{
                email:null,
                password: null,
            }
        }, methods: {
            async login(){
                try{
                    console.log("entre");
                    let form = new FormData();
                    form.append('email', this.email);
                    form.append('password', this.password);
                    let {data} = await this.$http.post("/login", form);
                    console.log(data);
                }catch(exception){
                    console.log(exception);
                }
            }
        }
    }
</script>

<style>

</style>