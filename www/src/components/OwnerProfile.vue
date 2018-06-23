<template>
    <div>
        <div class="ownerProf">
            <div class="profIcon d-flex">
                <i class="far fa-check-square"></i>
                <i class="far fa-address-card"></i>
                <i class="fas fa-dollar-sign"></i>

                <i class="far fa-plus-square"></i>
                <i class="far fa-stop-circle"></i>
                <i class="far fa-edit"></i>

                <button class="btn btn-outline-light ml-auto" @click=logout()>logout</button>
            </div>
            <h1 class="title">Hello {{owner.username}}</h1>

            <!-- Edit Profile Modal -->
            <button type="button" @click="show=false" class="btn btn-outline-light mb-2" data-toggle="modal" data-target="#editOwnerModal">Edit Profile</button>
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
                                <div v-if="show" class="form-group">
                                    <input v-model="owner.oldpassword" type="text" name="password" class="form-control" id="formGroupExampleInput" placeholder="Current Password">
                                </div>
                                <div v-if="show" class="form-group">
                                    <input v-model="owner.password" type="text" name="password" class="form-control" id="formGroupExampleInput" placeholder="New Password">
                                </div>
                                <button type="button" @click="show=true" class="btn btn-primary">Change Password</button>
                                <button type="button" @click="ownerEdit(owner)" class="btn btn-primary" data-dismiss="modal">Save</button>
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
            <button type="button" class="btn btn-outline-dark mt-2" data-toggle="modal" data-target="#addTruckModal">Add Truck</button>
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
                                        <span v-model="newTruck.hours" value="newTruck.hours" class="input-group-text" id="">Open from:</span>
                                    </div>
                                    <input type="text" class="form-control">
                                    <span v-model="newTruck.hours" value="newTruck.hours" class="input-group-text" id="">to:</span>
                                    <input type="text" class="form-control">
                                </div>
                                <br>
                                <input v-model="newTruck.description" value="newTruck.description" type="text" name="description" class="form-control" id="formGroupExampleInput"
                                    placeholder="Description">
                                <div class="modal-footer">
                                    <button type="button" @click="addTruck" class="btn btn-primary" data-dismiss="modal">Add Truck</button>
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <h3 class="title">Current Active Trucks:</h3>
        <div v-for="truck in owner.foodtrucks">

            <h2>{{truck.name}}</h2>
            <ul class="addTruckList">
                <li>{{truck.address}}, {{truck.city}}</li>
                <li>{{truck.cuisine}}</li>
                <li>{{truck.hours}}</li>
                <li>{{truck.description}}</li>
            </ul>

            <button @click="deleteTruck(truck)">
                <i class="far fa-trash-alt cardIcon"></i>
            </button>
            <!-- Edit Truck Modal -->
            <button type="button" class="btn btn-outline-dark mb-2" data-toggle="modal" data-target="#editTruckModal">
                <i class="far fa-edit"></i>
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
                                        <span v-model="truck.hours" class="input-group-text" id="">Open from:</span>
                                    </div>
                                    <input type="text" class="form-control">
                                    <span v-model="truck.hours" class="input-group-text" id="">to:</span>
                                    <input type="text" class="form-control">
                                </div>
                                <br>
                                <input v-model="truck.description" type="text" name="description" class="form-control" id="formGroupExampleInput" placeholder="Description">
                                <div class="modal-footer">
                                    <button type="button" @click="editTruck(truck)" class="btn btn-primary" data-dismiss="modal">Edit Truck</button>
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
                // this.truck.parentId = this.truck._id
                // this.truck.name = this.newtruck.name
                // this.truck.cuisine = this.newtruck.cuisine
                // this.truck.location.street = this.newtruck.location.street
                // this.truck.location.city = this.newtruck.location.city
                // this.truck.hours = this.newtruck.hours
                // this.truck.description = this.newtruck.description
                this.$store.dispatch('editTruck', truck)
            },
            ownerEdit(owner) {
                this.owner.username = this.newowner.username
                this.owner.businessName = this.newowner.businessName
                this.owner.email = this.newowner.email
                this.owner.oldpassword = this.changePassword.oldpassword
                this.owner.password = this.changePassword.password
                this.$store.dispatch('updateOwner', newowner)
            },
            logout() {
                this.$store.dispatch('logout')
            }
        }
    }

</script>

<style>
    .ownerProf {
        background-color: orange;
        color: white;
        border-bottom: 2px solid black;
    }

    .main-bottom-style {
        background-color: rgb(230, 220, 240)
    }

    .title {
        font-family: 'Cabin Sketch', cursive;
    }

    .addTruckList {
        list-style-type: none;
    }
</style>