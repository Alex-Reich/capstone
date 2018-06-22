<template>
  <div class="container-fluid">
    <div class="google-map" id="localTruckMap"></div>
    <button v-if="!user" @click="getGeoLocation,user=true">Use my location</button>
    <div class="accordion" id="accordion">
        <div class="card" v-for="(truck,index) in foodtrucks" :key="index">
          <div class="card-header" :id="index">
            <h5 class="mb-0">
              <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#'+truck._id" aria-expanded="true" :aria-controls="truck._id">
                  {{truck.businessName}}
              </button>
            </h5>
          </div>
      
          <div :id="truck._id" class="collapse" :aria-labelledby="index" data-parent="#accordion">
            <div class="card-body">
                {{index}}{{truck.businessName}}
                {{truck.address}}, {{truck.city}}
            </div>
          </div>
        </div>
    </div>
  </div>
  <!-- add this map to other components with <google-map name="Map"></google-map> -->
</template>

<script>
  export default {
    name: 'Search',
    props: ['name'],
    data() {
      return {
        mapName: 'localtruck-map',
        map: {},
        center: {
          lat: 43.6150,
          lng: -116.2023
        },
        foodtrucks:[],
        user: false      
      }
    },
    mounted() {
      this.$store.dispatch("getAllTrucks")
    },
    computed: {
      userGeoLocation() {
        return this.$store.state.userGeoLocation//,this.$watch.foodtrucks
      },
      foodTrucks() {
        return this.foodtrucks = this.$store.state.foodtrucks
      }
    },
    watch:{
      foodtrucks: function(foodtrucks){
        const element = document.getElementById('localTruckMap')
        const options = {
          zoom: 12,
          center: new google.maps.LatLng(this.center.lat, this.center.lng)
        }
        const map = new google.maps.Map(element, options);
        foodtrucks.forEach(truck => {
          var marker = new google.maps.Marker({
            position: {lat: truck.location[0].location.lat, lng: truck.location[0].location.lng},
            map: map,
            title: truck.businessName
          })
          marker.setMap(map);
        })
      }
    },
    methods: {
      getGeoLocation() {
        this.$store.dispatch('getGeoLocation')
        //this.createMap();
      }
      // createMap(){
      //   const element = document.getElementById('localTruckMap')
      //   const options = {
      //     zoom: 12,
      //     center: new google.maps.LatLng(this.center.lat, this.center.lng)
      //   }
      //   const map = new google.maps.Map(element, options);
      //   this.foodtrucks.forEach(truck => {
      //     var marker = new google.maps.Marker({
      //       position: {lat: userGeoLocation.lat, lng: userGeoLocation.lng},
      //       map: map,
      //       title: truck.businessName
      //     })
      //     marker.setMap(map);
      //   })
      // }
    }
  
}
</script>


<style>
  .google-map {
    width:100%;
    height: 600px;
    margin: 0 auto;
    touch-action: auto;
  }
</style>