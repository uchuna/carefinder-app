<template>
  <div class="py-10">
    <p class="text-violet-500 bg-gray-300 text-center text-xl font-semibold mb-4 py-3">Export Hospitals</p>
    <button @click="fetchAndExportHospitals('csv')"
      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-200 mb-4">
      Export Hospitals as CSV
    </button>
    <p v-if="errorMessage" class="text-red-500 font-semibold">{{ errorMessage }}</p>
  </div>
</template>
  
<script lang="ts">
import { defineComponent } from 'vue';

interface Hospital {
  properties: {
    facilityName: string;
    facilityAddress: string;
    facilityPhoneNumber: string;
    facilityEmail?: string;
  }
}

export default defineComponent({
  data() {
    return {
      errorMessage: '' // Initialize error message
    };
  },
  methods: {
    async fetchAndExportHospitals(format: string) {
      try {
        // Use CORS proxy to fetch hospital data from the API
        const response = await fetch('https://cors-anywhere.herokuapp.com/https://data.humdata.org/dataset/3b4a119a-309c-4d3f-900f-18a1f6ca2dfa/resource/5a3bdd13-3ada-4bf4-ac38-643390bc0562/download/nigeriahealthfacilities.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Hospital[] = await response.json();
        
        // Convert fetched hospital data to CSV format
        const csvContent = this.convertToCSV(data);

        // Create a data URI for the CSV content
        const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csvContent);
        
        // Create a link element and trigger a click event to download the CSV file
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `hospitals.${format}`);
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error('Error fetching or exporting hospitals:', error);
        // Set the error message to display to the user
        this.errorMessage = 'Error fetching or exporting hospitals. Please try again later.';
      }
    },
    convertToCSV(data: Hospital[]): string {
      const header = Object.keys(data[0].properties).join(',');
      const rows = data.map(hospital => Object.values(hospital.properties).join(','));
      return [header, ...rows].join('\n');
    }
  }
});
</script>
  
<style scoped>
</style>








<!-- <template>
  <div class="py-10">
    <p class="text-violet-500 bg-gray-300 text-center text-xl font-semibold mb-4 py-3">Export Hospitals</p>
    <button @click="exportHospitals('csv')"
      class="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-all duration-200 mb-4">
      Export Hospitals as CSV
    </button> -->
    <!-- <button @click="exportHospitals('json')" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200 mb-4">
        Export Hospitals as JSON
      </button> -->
  <!-- </div>
</template> -->
  
<!-- <script lang="ts">
import { defineComponent } from 'vue';


interface Hospital {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  email?: string;
}

export default defineComponent({
  data() {
    return {
      hospitals: [] as Hospital[],
    };
  },
  methods: {
    exportHospitals(format: string) {
      let content: string;

      if (format === 'csv') {
        content = "data:text/csv;charset=utf-8," + this.convertToCSV(this.hospitals);
      } else if (format === 'json') {
        content = "data:text/json;charset=utf-8," + JSON.stringify(this.hospitals, null, 2);
      } else {
        console.error('Unsupported export format');
        return;
      }

      const encodedUri = encodeURI(content);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `hospitals.${format}`);
      document.body.appendChild(link);
      link.click();
    },
    convertToCSV(data: Hospital[]): string {
      const csv = data.map(hospital => Object.values(hospital).join(',')).join('\n');
      return csv;
    }
  }
});
</script>
  
<style scoped>
</style> -->