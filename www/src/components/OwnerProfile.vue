<template>
    <div>
        <div class="ownerProf">
            <div class="profIcon d-flex">

                <button class="btn btn-dark ml-auto rnd" @click=logout()>Logout</button>
            </div>
            <h1 class="title">Hello {{owner.username}}</h1>

            <!-- Edit Profile Modal -->
            <button type="button" @click="show=false" class="btn btn1 mb-2" data-toggle="modal" data-target="#editOwnerModal">Edit Profile</button>
            <div class="modal fade" id="editOwnerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Profile</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form v-on:submit.prevent="ownerEdit(owner)">
                                <div class="form-group">
                                    <input v-model="owner.username" type="text" name="username" class="form-control" id="formGroupExampleInput" placeholder="Username"
                                        required>
                                </div>
                                <div class="form-group">
                                    <input v-model="owner.businessName" type="text" name="businessName" class="form-control" id="formGroupExampleInput" placeholder="Business Name"
                                        required>
                                </div>
                                <div class="form-group">
                                    <input v-model="owner.email" type="text" name="email" class="form-control" id="formGroupExampleInput" placeholder="email">
                                </div>
                                <button type="button" @click="show=true" class="btn btn1 mb-3">Change Password</button>
                                    <div v-if="show" class="form-group">
                                        <input v-model="changePassword.oldpassword" type="text" name="password" class="form-control" id="formGroupExampleInput" placeholder="Current Password">
                                    </div>
                                    <div v-if="show" class="form-group">
                                        <input v-model="changePassword.password" type="text" name="password" class="form-control" id="formGroupExampleInput" placeholder="New Password">
                                    </div>
                                <button type="button" @click="ownerEdit(owner)" v-if="!show"class="btn btn2 mb-3" data-dismiss="modal">Save</button>
                                <button type="button" @click="updatePassword(changePassword)" v-if="show" class="btn btn1" data-dismiss="modal">Update Password</button>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Done</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <!-- Add Truck Modal -->
            <button type="button" class="btn btn1 mt-2" data-toggle="modal" data-target="#addTruckModal">Add Truck</button>
            <div class="modal fade" id="addTruckModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Truck</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form v-on:submit.prevent="addTruck">
                                <div class="form-group">
                                    <input v-model="newTruck.name" value="newTruck.name" type="text" name="truckName" class="form-control" id="formGroupExampleInput"
                                        placeholder="Truck Name" required>
                                </div>
                                <select v-model="newTruck.cuisine" value="newTruck.cuisine" class="form-control" name="Cuisine" placeholder="Select Cuisine Type">
                                    <option value="" disabled selected hidden>Please Choose...</option>
                                    <option>Asian</option>
                                    <option>Mexican</option>
                                    <option>American</option>
                                    <option>Soul Food</option>
                                    <option>Italian</option>
                                    <option>Other</option>
                                </select>
                                <br>
                                <div class="form-group">
                                    <input v-model="newTruck.location.street" value="newTruck.location.street" type="text" name="location" class="form-control" id="formGroupExampleInput"
                                        placeholder="Address" required>
                                </div>

                                <div class="form-group">
                                    <input v-model="newTruck.location.city" value="newTruck.location.city" type="text" name="city" class="form-control" id="formGroupExampleInput"
                                        placeholder="City" required>
                                </div>

                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="">Open from:</span>
                                        <input v-model="newTruck.start" value="HH:mm" type="time" class="form-control">
                                        <span class="input-group-text" id="">to:</span>
                                        <input v-model="newTruck.end" value="HH:mm" type="time" class="form-control">
                                    </div>
                                </div>
                                <br>
                                <input v-model="newTruck.description" value="newTruck.description" type="text" name="description" class="form-control" id="formGroupExampleInput"
                                    placeholder="Description">
                                <div class="modal-footer">
                                    <button type="button" @click="addTruck" class="btn btn2" data-dismiss="modal">Save</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h3 class="title">Current Active Trucks:</h3>
        <div v-for="truck in owner.foodtrucks" class = "truckboarder">

            <h2>{{truck.name}}</h2>
            
                <p>Location: {{truck.address}}, {{truck.city}}</p>
                <p>Cuisine Type: {{truck.cuisine}}</p>
                <p>{{truck.hours}}</p>
                <p>{{truck.description}}</p>
        
            <!-- Edit Truck Modal -->
            <button type="button" class="btn btn1 mb-2" data-toggle="modal" data-target="#editTruckModal">
                Edit Truck
            </button>
            <div class="modal fade" id="editTruckModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Truck</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form v-on:submit.prevent="editTruck(truck)">
                                <div class="form-group">
                                    <input type="text" v-model="truck.name" name="truckname" class="form-control" id="formGroupExampleInput" placeholder="Truck Name"
                                        required>
                                </div>
                                <select v-model="truck.cuisine" class="form-control" name="Cuisine" placeholder="Select Cuisine Type">
                                    <option value="" disabled selected hidden>Please Choose...</option>
                                    <option>Asian</option>
                                    <option>Mexican</option>
                                    <option>American</option>
                                    <option>Soul Food</option>
                                    <option>Italian</option>
                                    <option>Other</option>
                                </select>
                                <div class="form-group">
                                    <input v-model="truck.address" type="text" name="location" class="form-control" id="formGroupExampleInput" placeholder="Address"
                                        required>
                                </div>
                                <div class="form-group">
                                    <input v-model="truck.city" type="text" name="city" class="form-control" id="formGroupExampleInput" placeholder="City"
                                        required>
                                </div>
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="">Open from:</span>
                                        <input v-model="truck.start" value="HH:mm" type="time" class="form-control">
                                        <span class="input-group-text" id="">to:</span>
                                        <input v-model="truck.end" value="HH:mm" type="time" class="form-control">
                                    </div>
                                </div>
                                <br>
                                <input v-model="truck.description" type="text" name="description" class="form-control" id="formGroupExampleInput" placeholder="Description">
                                <div class="modal-footer">
                                    <button type="button" @click="editTruck(truck)" class="btn btn2" data-dismiss="modal">Save</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                        <button @click="deleteTruck(truck)">
                            <i class="far fa-trash-alt cardIcon"></i>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import router from '../router'
    export default {
        name: '',
        data() {
            return {
                newowner: {
                    username: '',
                    businessName: '',
                    email: '',
                    password: ''
                },
                newTruck: {
                    name: '',
                    businessName: '',
                    cuisine: '',
                    location: {
                        street: '',
                        city: '',
                        state: 'ID'
                    },
                    city: '',
                    hours: '',
                    start: '',
                    end: '',
                    description: '',
                    parentId: ''
                },
                changePassword: {
                    oldpassword: "",
                    password: "",
                },
                show:false

            }
        },
        mounted() {
            if (!this.$store.state.owner._id) {
                router.push({ name: 'Home' })
            }
        },
        computed: {
            owner() {
                return this.$store.state.owner
            }
        },
        methods: {
            addTruck() {
                this.newTruck.parentId = this.owner._id
                this.newTruck.businessName = this.owner.businessName
                this.newTruck.address=this.newTruck.location.street
                this.newTruck.city=this.newTruck.location.city
                this.newTruck.hours=this.newTruck.start+" to "+this.newTruck.end
                this.$store.dispatch('addTruck', this.newTruck)
                this.newTruck={
                    name: '',
                    businessName: '',
                    cuisine: '',
                    location: {
                        street: '',
                        city: '',
                        state: 'ID'
                    }
                }
            },
            deleteTruck(truck) {
                this.$store.dispatch('deleteTruck', truck._id)
            },
            editTruck(truck) {
                this.newTruck.address=this.newTruck.location.street
                this.newTruck.city=this.newTruck.location.city
                this.newTruck.hours=this.newTruck.start+" to "+this.newTruck.end
                this.$store.dispatch('editTruck', truck)
            },
            ownerEdit(owner) {
                this.$store.dispatch('updateOwner', owner)
            },
            updatePassword(changePassword){
                this.$store.dispatch('updatePassword', changePassword)
            },
            logout() {
                this.$store.dispatch('logout')
            }
        }
    }

</script>

<style>
    .ownerProf {
        background-color: rgb(255, 0, 0);
        color: white;
        border-bottom: 2px solid black;
    }

    .main-bottom-style {
        background-color: rgb(220, 237, 240)
    }

    .title {
        font-family: 'Palanquin Dark', sans-serif;
    }
    .truckboarder{
        border-color: black;
        border: solid 2px; 
        margin-bottom: 4px;
    }

</style>