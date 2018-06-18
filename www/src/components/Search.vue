<template>
  <div class="google-map" id="localTruckMap">
    <button @click="getGeoLocation">Geo</button>
  </div>
  <!-- add this map to other components with <google-map name="Map"></google-map> -->
</template>

<script>
  export default {
    name: 'Search',
    props: ['name'],
    data() {
      return {
        mapName: this.name + '-map',
        map: {},
        boise: {
          lat: 43.6150,
          lng: -116.2023
        },
        markerCoordinates: [
          {// taco bell garden city
            latitude: 43.6491071,
            longitude: -116.2810966
          },
          {// pie hole pizza boise
            latitude: 43.616671,
            longitude: -116.2027034
          },
          {// big judds meridian 
            latitude: 43.5907617,
            longitude: -116.3565662
          },
        ]
      }
    },
    mounted() {
      this.$store.dispatch('getAllTrucks')
      const element = document.getElementById('localTruckMap')
      // console.log('Map name is: ',this.mapName)
      const options = {
        zoom: 13,
        center: new google.maps.LatLng(this.boise.lat, this.boise.lng)
      }
      // console.log('the Map options: ',options)
      const map = new google.maps.Map(element, options);
      // console.log('the Map object created by Google: ',map)
      this.foodTrucks.location.forEach((coord) => {
        const position = new google.maps.LatLng(coord.lat, coord.lng);
        const marker = new google.maps.Marker({ position, map })
      })
    },
    computed: {
      userGeoLocation() {
        return this.$store.state.userGeoLocation
      },
      foodTrucks() {
        console.log(foodTrucks)
        return this.$store.state.foodtrucks
      }
    },
    methods: {
      getAllTrucks() {
        this.$store.dispatch('getAllTrucks')
      },
      getGeoLocation() {
        this.$store.dispatch('getGeoLocation')
      }
      // initMap(){
      //    const element = document.getElementById('this.mapName')
      //    const options = {
      //      zoom: 12,
      //      center: new google.maps.LatLng(43.6150,-116.2023)
      //    }
      //   this.map = new google.maps.Map(element,options)
      //    let marker = new google.maps.Marker({
      //      position: boise,
      //      map: map
      //    })
      //    console.log(this.map)
      //    this.$store.commit('setMap', [])
      //  }
    }
  }
</script>


<style>
  .google-map {
    width: 800px;
    height: 600px;
    margin: 0 auto;
    /* background: gray; */
  }
</style>