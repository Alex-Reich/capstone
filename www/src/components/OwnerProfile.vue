<template>
    <div class="ownerProf" >
        <h1 class="title">Hello {{owner.username}}</h1>

        <button class='btn btn-primary'>Edit Profile</button>
        <i class="far fa-check-square"></i>
        <i class="far fa-address-card"></i>
        <i class="fas fa-dollar-sign"></i>
        <i class="far fa-minus-square"></i>
        <i class="far fa-plus-square"></i>
        <i class="far fa-stop-circle"></i>
        <i class="far fa-edit"></i>

        <!-- Check in Modal -->
        <button type="button" class='btn btn-primary' data-toggle="modal" data-target="#checkinModal">Check In</button>
        <div class="modal fade" id="checkinModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Check In</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form v-on: submit.prevent="checkin">
                            <div class="form-group">
                                <!-- add v-model="test.test" info into input -->
                                <input type="text" name="truckName" class="form-control" id="formGroupExampleInput" placeholder="Truck Name" required>
                            </div>
                            <div class="form-group">
                                <input type="text" name="location" class="form-control" id="formGroupExampleInput" placeholder="Location">
                            </div>

                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="">Open from:</span>
                                </div>
                                <input type="text" class="form-control">
                                <span class="input-group-text" id="">to:</span>
                                <input type="text" class="form-control">
                            </div>
                            <input type="text" name="description" class="form-control" id="formGroupExampleInput" placeholder="Description">
                        </form>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" @click="checkin" class="btn btn-primary" data-dismiss="modal">Check In</button>
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                </div>
            </div>
        </div>
3
        <h1 class="title">Current Active Trucks:</h1>

    </div>
</template>


<script>
    export default {
        name: '',
        data() {
            return {
                
            }
        },
        computed: {
            owner(){
                return this.$store.state.owner
            }
        },
        methods: {}
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