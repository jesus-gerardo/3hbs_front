<template>
    <v-app>
        <v-app-bar app dense>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </v-app-bar>

        <v-navigation-drawer app v-model="drawer" absolute bottom temporary>
            <v-list-item>
                <v-list-item-avatar>
                    <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>User</v-list-item-title>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list nav dense>
                <v-list-item-group>
                    <v-list-item link to="/admin/airports">
                        <v-list-item-icon><v-icon>mdi-airport</v-icon></v-list-item-icon>
                        <v-list-item-title>Airports</v-list-item-title>
                    </v-list-item>

                    <v-list-item link to="/admin/airlines">
                        <v-list-item-icon><v-icon>mdi-airplane</v-icon></v-list-item-icon>
                        <v-list-item-title>Airlines</v-list-item-title>
                    </v-list-item>

                    <v-list-item link to="/admin/fligths">
                        <v-list-item-icon><v-icon>mdi-airplane-takeoff</v-icon></v-list-item-icon>
                        <v-list-item-title>Fligths</v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
        
        <v-main>
            <v-container fluid>
                <router-view/>
            </v-container>
        </v-main>

        <v-footer app>
            <!-- -->
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        name:'Main',
        data (){
            return{
                drawer: false,
            }
        }
    }
</script>

<style>

</style>