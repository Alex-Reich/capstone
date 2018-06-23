<template>
  <div class="container-fluid search"  v-on:scroll.passive="onScroll">
    <div class="google-map pb-0.5" id="localTruckMap"></div>
    <button v-if="!user" @click="getGeoLocation,user=true" style="z-index:0">Use my location</button>
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
          <div class="card-body">
            <p>{{truck.businessName}}</p>
            <p>{{truck.address}}, {{truck.city}}</p>
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
          const options = {
            zoom: 12,
            center: new google.maps.LatLng(this.center.lat, this.center.lng)
          }
          const map = new google.maps.Map(element, options);
          console.log("setMap")
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
        this.$store.dispatch('getAllTrucks')
        this.$store.dispatch('getGeoLocation')
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
  }

  .accorion {
    overflow: hidden;
  }

  .search {
    background-color: red;
    margin-top: 0;
  }
</style>