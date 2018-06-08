<template>
    <div class="ownerProf">
        <h1 class="title">Hello {{owner.username}}</h1>


        <i class="far fa-check-square"></i>
        <i class="far fa-address-card"></i>
        <i class="fas fa-dollar-sign"></i>

        <i class="far fa-plus-square"></i>
        <i class="far fa-stop-circle"></i>
        <i class="far fa-edit"></i>

        <!-- Check in Modal -->
        <button type="button" class='btn btn-primary' data-toggle="modal" data-target="#checkinModal">Add Truck</button>
        <div class="modal fade" id="checkinModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                <!-- add v-model="test.test" info into input -->
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
                                <input v-model="truck.location" type="text" name="location" class="form-control" id="formGroupExampleInput" placeholder="Location">
                            </div>

                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span v-model="truck.time" class="input-group-text" id="">Open from:</span>
                                </div>
                                <input type="text" class="form-control">
                                <span v-model="truck.time" class="input-group-text" id="">to:</span>
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
        <h1 class="title">Current Active Trucks:</h1>
        <div v-for="truck in owner.foodtrucks">
            <button @click="deleteTruck">
                <i class="far fa-minus-square"></i>
            </button>
            <h1>{{truck.businessName}}</h1>
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
                    cuisine: '',
                    location: '',
                    time: '',
                    description: ''

                }
            }
        },
        computed: {
            owner() {
                return this.$store.state.owner
            }
        },
        methods: {
            addTruck() {
                var ownerid = owner.id
                this.$store.dispatch('addTruck', this.owner.id)
            },
            deleteTruck() {
                this.$store.dispatch('deleteTruck', this.truck)
            }
        }
    }

</script>

<style>
    .ownerProf {
        background-color: orange;
        color: white;
    }

    .main-bottom-style {
        background-color: rgb(230, 220, 240)
    }

    .title {
        font-family: 'Cabin Sketch', cursive;
    }
</style>