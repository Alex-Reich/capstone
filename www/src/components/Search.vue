<template>
  <div class="container-fluid search"  v-on:scroll.passive="onScroll">
    <div class="btn-style text-center">
      <button class="mt-1" style="float: right;" v-if="!user" @click="getGeoLocation,user=true">Use my location</button>
      <button class="mt-1" style="float: left;" @click="backHome">Back</button>
    </div>
    <div class="google-map pb-0.5" id="localTruckMap"></div>
    <div class="accordion" id="accordion">
      <div class="card" v-for="(truck,index) in foodTrucks" :key="index">
        <div class="card-header pb-0 pt-0" style="height: 35px;" :id="index">
          <h5 class="mb-0">
            <button class="btn btn-link" type="button" data-toggle="collapse" :data-target="'#'+truck._id" aria-expanded="true" :aria-controls="truck._id">
              <p>{{(labels[index])}} - {{truck.businessName}}</p>
            </button>
          </h5>
        </div>

        <div :id="truck._id" class="collapse" :aria-labelledby="index" data-parent="#accordion">
          <div class="card-body text-left flex-wrap">
            <p class="truck-info">{{truck.businessName}}</p>
            <p class="truck-info">{{truck.address}}, {{truck.city}}</p>
            <p class="truck-info">{{truck.cuisine}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- add this map to other components with <google-map name="Map"></google-map> -->
</template>

<script>
  import router from '../router'
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
        user: false,
        labels: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
        labelIndex: 0
      }
    },
    mounted() {
      this.$store.dispatch("getAllTrucks")
    },
    computed: {
      userGeoLocation() {
        return this.$store.state.userGeoLocation
      },
      foodTrucks() {
        return this.$store.state.foodtrucks
      }
    },
    watch: {
      foodTrucks: {
        handler(foodTrucks) {
          const element = document.getElementById('localTruckMap')
          if(this.userGeoLocation.lat!=0){
            this.center.lat=this.userGeoLocation.lat;
            this.center.lng=this.userGeoLocation.lng;
          }
          const options = {
            zoom: 12,
            center: new google.maps.LatLng(this.center.lat, this.center.lng)
          }
          const map = new google.maps.Map(element, options);
          foodTrucks.forEach(truck => {
            var marker = new google.maps.Marker({
              position: { lat: truck.location[0].location.lat, lng: truck.location[0].location.lng },
              map: map,
              label: this.labels[this.labelIndex++ % this.labels.length]
            })
            marker.setMap(map);
          })
        }
      },
      deep: true
    },
    methods: {
      getGeoLocation() {
        this.$store.dispatch('getGeoLocation')
        this.$store.dispatch('getAllTrucks')
      },
      backHome(){
        router.push({name: "Home"})
      }
    }

  }
</script>


<style>
  .google-map {
    width: 100%;
    height: 600px;
    margin: 0 auto;
    touch-action: auto;
    padding-top: 1rem;
    margin-bottom: 1rem;
  }

  .accorion {
    /* overflow: hidden; */
    position: relative;
    height: 15%;
  }

  .search {
    background-color: red;
    position: fixed;
  }

  .btn-style{
    height: 40px;
  }

  .truck-info{
    padding: 0px 0px;
    margin: 0.5px 0.5px;
  }
</style>