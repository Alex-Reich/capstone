<template>
    <div class="ownerProf">

        <button class='btn btn-primary'>Edit Profile</button>


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

        <h1>Current Active Trucks:</h1>

    </div>
</template>


<script>
    export default {
        name: '',
        data() {
            return {

            }
        },
        computed: {},
        methods: {}
    }

</script>

<style>
</style>