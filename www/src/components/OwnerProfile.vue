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

        <!-- Edit Profil Modal -->
        <button type="button" class="btn btn-outline-light mb-2" data-toggle="modal" data-target="#editOwnerModal">Edit Profile</button>
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
                        <form v-on:submit.prevent="ownerEdit">
                            <div class="form-group">
                                <input v-model="newowner.username" type="text" name="username" class="form-control" id="formGroupExampleInput" placeholder="Username" required>
                            </div>
                            <div class="form-group">
                                <input v-model="newowner.businessName" type="text" name="businessName" class="form-control" id="formGroupExampleInput" placeholder="Business Name" required>
                            </div>
                            <div class="form-group">
                                <input v-model="newowner.email" type="text" name="email" class="form-control" id="formGroupExampleInput" placeholder="email">
                            </div>
                            <div class="form-group">
                                <input v-model="newowner.password" type="text" name="password" class="form-control" id="formGroupExampleInput" placeholder="Password">
                            </div>
                            <button type="button" @click="ownerEdit" class="btn btn-primary" data-dismiss="modal">Edit Profile</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
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
                        <form v-on: submit.prevent="addTruck">
                            <div class="form-group">
                                <input v-model="truck.name" type="text" name="truckName" class="form-control" id="formGroupExampleInput" placeholder="Truck Name"
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
                            <br>
                            <div class="form-group">
                                <input v-model="truck.location.street" type="text" name="location" class="form-control" id="formGroupExampleInput" placeholder="Address" required>
                            </div>
                            
                            <div class="form-group">
                                <input v-model="truck.location.city" type="text" name="city" class="form-control" id="formGroupExampleInput" placeholder="City" required>
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

    <h2>{{truck.name}}<button @click="deleteTruck(truck)"><i class="far fa-trash-alt cardIcon"></i></button></h2>
    <ul>
    <li>{{truck.location}}</li>
    <li>{{truck.hours}}</li>
    <li>{{truck.description}}</li>
    </ul>
        </div>
        
    </div>
</template>


<script>
    import router from '../router'
    export default {
        name: '',
        data() {
            return {
                truck: {
                    name: '',
                    businessName: '',
                    cuisine: '',
                    location: {
                        street:'',
                        city:'',
                        state: 'ID'
                    },
                    city:'',
                    hours: '',
                    description: '',
                    parentId: ''
                },
                newowner:{
                    username:'',
                    businessName:'',
                    email:'',
                    password:''
                }
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
                this.truck.parentId = this.owner._id
                this.truck.businessName = this.owner.businessName
                this.$store.dispatch('addTruck', this.truck)
            },
            deleteTruck(truck) {
                this.$store.dispatch('deleteTruck', truck._id)
            },
            ownerEdit(owner) {
                this.owner.username = this.newowner.username
                this.owner.businessName = this.newowner.businessName
                this.owner.email = this.newowner.email
                this.owner.password = this.newowner.password
                this.$store.dispatch('updateOwner', this.owner)
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

</style>