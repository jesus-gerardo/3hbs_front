<template>
    <v-main>
        <v-container fluid fill-height>
            <v-layout align-center justify-center>
                <v-card class="elevation-12" min-width="450">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Login</v-toolbar-title>
                    </v-toolbar>
                    
                    <v-card-text>
                        <v-form ref="formLogin">
                            <v-text-field
                                prepend-icon="mdi-account"
                                v-model="email"
                                label="Email"
                                :rules="[$required, $email]"
                            ></v-text-field>

                            <v-text-field
                                prepend-icon="mdi-lock"
                                v-model="password"
                                label="Password"
                                type="password"
                                :rules="[$required]"
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

        <v-overlay :value="overlay" :z-index="9999">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </v-main>
</template>

<script>
    export default {
        name:"Login",
        data(){
            return{
                email:null,
                password: null,
                overlay: false,
            }
        }, methods: {
            async login(){
                try{
                    let valid = this.$refs.formLogin.validate();
                    if(!valid){
                        return false
                    }
                    this.overlay = true;
                    let form = new FormData();
                    form.append('email', this.email);
                    form.append('password', this.password);
                    let {data} = await this.$http.post("/login", form);
                    this.overlay = false;
                    if(!data.success){
                        console.log("error");
                        return;
                    }
                    localStorage.setItem('token', `Bearer ${data.token}`);
                    this.$router.push({name: 'admin'})
                }catch(exception){
                    console.log(exception);
                    this.overlay = false;
                }
            }
        }
    }
</script>

<style>

</style>