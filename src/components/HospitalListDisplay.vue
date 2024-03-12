<template>
  <div>
    <h2 class="text-violet-500 bg-gray-300 text-center text-xl font-semibold mb-4 py-3">Hospital List</h2>

    <ul>
      <li v-for="hospital in displayedHospitals" :key="hospital.id">
        <!-- Hospital details -->
        <div class="flex justify-between">
          <div>
            <p class="font-semibold">{{ hospital.properties.facilityName }}</p>
            <p>{{ hospital.properties.facilityAddress }}</p>
            <p>{{ hospital.properties.facilityPhoneNumber }}</p>
            <p>{{ hospital.properties.facilityEmail }}</p>
          </div>
          <button @click="editHospital(hospital)"
            class="bg-green-500 text-white px-3 py-3 rounded-md hover:bg-green-600 transition-all duration-200">Edit</button>
        </div>
        <hr class="my-2 border-gray-300">
      </li>
    </ul>

    <!-- Pagination controls -->
    <div class="flex justify-center mt-4">
      <button @click="previousPage" :disabled="currentPage === 1"
        class="px-3 py-1 bg-gray-300 text-gray-700 rounded-md mr-2">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages"
        class="px-3 py-1 bg-gray-300 text-gray-700 rounded-md ml-2">Next</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { checkAuthentication } from '@/utils/authUtils';
import router from '@/router';

export default defineComponent({
  props: {
    hospitals: {
      type: Array as () => Array<any>,
      required: true
    }
  },
  data() {
    console.log(this.hospitals);
    return {
      currentPage: 1,
      pageSize: 5, // Number of hospitals per page
    };
  },
  computed: {
    displayedHospitals(): Array<any> {
      if (!this.hospitals) {
        return [];
      }
      // Calculate pagination
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.hospitals.slice(startIndex, endIndex);
    },
    totalPages(): number {
      if (!this.hospitals) {
        return 0;
      }
      // Calculate total pages based on hospitals count
      return Math.ceil(this.hospitals.length / this.pageSize);
    }
  },
  methods: {
    editHospital(hospital: any) {
      // Check if the user is authenticated
      const isAuthenticated = checkAuthentication();
      if (isAuthenticated) {
        // Redirect to the edit page with hospital ID as parameter
        router.push({ name: 'EditHospital', params: { id: hospital.properties.id } });
      } else {
        // Redirect the user to the login page
        router.push('/login');
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
});
</script>






<!-- <template>
  <div>
    <h2 class="text-violet-500 bg-gray-300 text-center text-xl font-semibold mb-4 py-3">Hospital List</h2>
    
    <ul>
      <li v-for="hospital in displayedHospitals" :key="hospital.id"> -->
<!-- Hospital details -->
<!-- <div class="flex justify-between">
          <div>
            <p class="font-semibold">{{ hospital.name }}</p>
            <p>{{ hospital.address }}</p>
            <p>{{ hospital.phoneNumber }}</p>
            <p>{{ hospital.email }}</p>
          </div>
          <button @click="editHospital(hospital)" class="bg-green-500 text-white px-3 py-3 rounded-md hover:bg-green-600 transition-all duration-200">Edit</button>
        </div>
        <hr class="my-2 border-gray-300">
      </li>
    </ul> -->

<!-- Pagination controls -->
<!-- <div class="flex justify-center mt-4">
      <button @click="previousPage" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-300 text-gray-700 rounded-md mr-2">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 bg-gray-300 text-gray-700 rounded-md ml-2">Next</button>
    </div>
  </div>
</template> -->

<!-- <script lang="ts">
import { defineComponent } from 'vue';
import { type Hospital } from '@/utils/hospitals';
import { checkAuthentication } from '@/utils/authUtils';
import router from '@/router';

export default defineComponent({
  props: {
    hospitals: {
      type: Array as () => Hospital[],
      required: true
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5, // Number of hospitals per page
    };
  },
  computed: {
    displayedHospitals(): Hospital[] {
      // Calculate pagination
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.hospitals.slice(startIndex, endIndex);
    },
    totalPages(): number {
      // Calculate total pages based on hospitals count
      return Math.ceil(this.hospitals.length / this.pageSize);
    }
  },
  methods: {
    editHospital(hospital: Hospital) {
      // Check if the user is authenticated
      const isAuthenticated = checkAuthentication(); // Implement this function according to your authentication logic
      if (isAuthenticated) {
        // Redirect to the edit page with hospital ID as parameter
        router.push({ name: 'EditHospital', params: { id: hospital.id } });
      } else {
        // Redirect the user to the login page
        router.push('/login');
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  }
});
</script> -->






<!-- <template>
  <div>
    <h2 class="text-violet-500 bg-gray-300 text-center text-xl font-semibold mb-4 py-3">Hospital List</h2>
    
    <ul>
      <li v-for="hospital in displayedHospitals" :key="hospital.id"> -->
<!-- Hospital details -->
<!-- <div class="flex justify-between">
          <div>
            <p class="font-semibold">{{ hospital.name }}</p>
            <p>{{ hospital.address }}</p>
            <p>{{ hospital.phoneNumber }}</p>
            <p>{{ hospital.email }}</p>
          </div>
          <button @click="editHospitalOrPrompt(hospital)" class="bg-green-500 text-white px-3 py-3 rounded-md hover:bg-green-600 transition-all duration-200">Edit</button>
        </div>
        <hr class="my-2 border-gray-300"> -->
<!-- Display the edit form if the current hospital is being edited -->
<!-- <div v-if="editedHospital && editedHospital.id === hospital.id">
          <form @submit.prevent="updateHospital" class="m-10">
            <input type="text" v-model="editedHospital.name" placeholder="Hospital Name">
            <input type="text" v-model="editedHospital.address" placeholder="Hospital Address">
            <input type="text" v-model="editedHospital.phoneNumber" placeholder="Hospital Phone Number">
            <input type="text" v-model="editedHospital.email" placeholder="Hospital Email">
            <button type="submit" class="px-3 bg-blue-400 text-white hover:bg-blue-600 rounded-md">Update</button>
            <button @click="cancelEdit" class="px-3 bg-red-400 text-white hover:bg-red-600 rounded-md">Cancel</button>
          </form>
        </div>
      </li>
    </ul> -->

<!-- Pagination controls -->
<!-- <div class="flex justify-center mt-4">
      <button @click="previousPage" :disabled="currentPage === 1" class="px-3 py-1 bg-gray-300 text-gray-700 rounded-md mr-2">Previous</button>
      <span>Page {{ currentPage }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 bg-gray-300 text-gray-700 rounded-md ml-2">Next</button>
    </div>
  </div>
</template> -->

<!-- <script lang="ts">
import { defineComponent } from 'vue';
import { type Hospital } from '@/utils/hospitals';
import router from '@/router';
import { checkAuthentication } from '@/utils/authUtils';

export default defineComponent({
  props: {
    hospitals: {
      type: Array as () => Hospital[],
      required: true
    },
    allStates: {
      type: Array as () => string[],
      required: true
    },
    allProviders: {
      type: Array as () => string[],
      required: true
    }
  },
  data() {
    return {
      editedHospital: null as Hospital | null, // Track the currently edited hospital
      currentPage: 1,
      pageSize: 5, // Number of hospitals per page
      selectedState: '', // Track the selected state
      selectedProvider: '', // Track the selected provider
    };
  },
  computed: {
    displayedHospitals(): Hospital[] {
      // Filter hospitals by state and provider
      let filteredHospitals = this.hospitals;
      if (this.selectedState) {
        filteredHospitals = filteredHospitals.filter(hospital => hospital.state === this.selectedState);
      }
      if (this.selectedProvider) {
        filteredHospitals = filteredHospitals.filter(hospital => hospital.provider === this.selectedProvider);
      }
      // Calculate pagination
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return filteredHospitals.slice(startIndex, endIndex);
    },
    totalPages(): number {
      // Calculate total pages based on filtered hospitals
      let filteredHospitals = this.hospitals;
      if (this.selectedState) {
        filteredHospitals = filteredHospitals.filter(hospital => hospital.state === this.selectedState);
      }
      if (this.selectedProvider) {
        filteredHospitals = filteredHospitals.filter(hospital => hospital.provider === this.selectedProvider);
      }
      return Math.ceil(filteredHospitals.length / this.pageSize);
    }
  },
  methods: {
    editHospitalOrPrompt(hospital: Hospital) {
      // Check if the user is authenticated
      const isAuthenticated = checkAuthentication(); // Implement this function according to your authentication logic
      if (isAuthenticated) {
        this.editHospital(hospital);
      } else {
        // Redirect the user to the login page
        router.push('/login');
      }
    },
    editHospital(hospital: Hospital) {
      this.editedHospital = { ...hospital }; // Set the currently edited hospital
    },
    updateHospital() {
      // Emit an event to the parent component to handle the update operation
      this.$emit('update-hospital', this.editedHospital);
      // Reset edit mode after updating
      this.editedHospital = null;
    },
    cancelEdit() {
      // Cancel the editing process
      this.editedHospital = null;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    selectState(event: Event) {
      if (event.target instanceof HTMLSelectElement) {
        const selectedState = event.target.value;
        this.selectedState = selectedState;
        // Reset current page to 1 when a state is selected
        this.currentPage = 1;
      }
    },
      selectProvider(event: Event) {
        if (event.target instanceof HTMLSelectElement) {
          const selectedProvider = event.target.value;
          this.selectedProvider = selectedProvider;
          // Reset current page to 1 when a provider is selected
          this.currentPage = 1;
        }
    }
  }
});
</script> -->




<!-- <template>
  <div>
    <h2 class="text-violet-500 bg-gray-300 text-center text-xl font-semibold mb-4 py-3">Hospital List</h2>
    <ul>
      <li v-for="hospital in hospitals" :key="hospital.id">
        <div class="flex justify-between">
          <div>
            <p class="font-semibold">{{ hospital.name }}</p>
            <p>{{ hospital.address }}</p>
            <p>{{ hospital.phoneNumber }}</p>
            <p>{{ hospital.email }}</p>
          </div>
          <button @click="editHospitalOrPrompt(hospital)" class="bg-green-500 text-white px-3 py-3 rounded-md hover:bg-green-600 transition-all duration-200">Edit</button>
        </div>
        <hr class="my-2 border-gray-300"> -->
<!-- Display the edit form if the current hospital is being edited -->
<!-- <div v-if="editedHospital && editedHospital.id === hospital.id">
          <form @submit.prevent="updateHospital" class="m-10">
            <input type="text" v-model="editedHospital.name" placeholder="Hospital Name">
            <input type="text" v-model="editedHospital.address" placeholder="Hospital Address">
            <input type="text" v-model="editedHospital.phoneNumber" placeholder="Hospital Phone Number">
            <input type="text" v-model="editedHospital.email" placeholder="Hospital Email">
            <button type="submit" class="px-3 bg-blue-400 text-white hover:bg-blue-600 rounded-md">Update</button>
            <button @click="cancelEdit" class="px-3 bg-red-400 text-white hover:bg-red-600 rounded-md">Cancel</button>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue';
import { type Hospital } from '@/utils/hospitals';
import router from '@/router';
import { checkAuthentication } from '@/utils/authUtils';

export default defineComponent({
  props: {
    hospitals: {
      type: Array as () => Hospital[],
      required: true
    }
  },
  data() {
    return {
      editedHospital: null as Hospital | null // Track the currently edited hospital
    };
  },
  methods: {
    editHospitalOrPrompt(hospital: Hospital) {
      // Check if the user is authenticated
      const isAuthenticated = checkAuthentication(); // Implement this function according to your authentication logic
      if (isAuthenticated) {
        this.editHospital(hospital);
      } else {
        // Redirect the user to the login page
        router.push('/login');
      }
    },
    editHospital(hospital: Hospital) {
      this.editedHospital = { ...hospital }; // Set the currently edited hospital
    },
    updateHospital() {
      // Emit an event to the parent component to handle the update operation
      this.$emit('update-hospital', this.editedHospital);
      // Reset edit mode after updating
      this.editedHospital = null;
    },
    cancelEdit() {
      // Cancel the editing process
      this.editedHospital = null;
    }
  }
});
</script> -->




<!-- <template>
  <div>
    <h2 class="text-violet-500 bg-gray-300 text-center text-xl font-semibold mb-4 py-3">Hospital List</h2>
    <ul>
      <li v-for="hospital in hospitals" :key="hospital.id">
        <div class="flex justify-between">
          <div>
            <p class="font-semibold">{{ hospital.name }}</p>
            <p>{{ hospital.address }}</p>
            <p>{{ hospital.phoneNumber }}</p>
            <p>{{ hospital.email }}</p>
          </div>
          <button @click="editHospital(hospital)" class="bg-green-500 text-white px-3 py-3 rounded-md hover:bg-green-600 transition-all duration-200">Edit</button>
        </div>
        <hr class="my-2 border-gray-300"> -->
<!-- Display the edit form if the current hospital is being edited -->
<!-- <div v-if="editedHospital && editedHospital.id === hospital.id">
          <form @submit.prevent="updateHospital" class="m-10">
            <input type="text" v-model="editedHospital.name" placeholder="Hospital Name">
            <input type="text" v-model="editedHospital.address" placeholder="Hospital Address">
            <input type="text" v-model="editedHospital.phoneNumber" placeholder="Hospital Phone Number">
            <input type="text" v-model="editedHospital.email" placeholder="Hospital Email">
            <button type="submit" class="px-3 bg-blue-400 text-white hover:bg-blue-600 rounded-md">Update</button>
            <button @click="cancelEdit" class="px-3 bg-red-400 text-white hover:bg-red-600 rounded-md">Cancel</button>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template> -->

<!-- <script lang="ts">
import { defineComponent } from 'vue';
import { type Hospital } from '@/utils/hospitals'


export default defineComponent({
  props: {
    hospitals: {
      type: Array as () => Hospital[],
      required: true
    }
  },
  data() {
    return {
      editedHospital: null as Hospital | null // Track the currently edited hospital
    };
  },
  methods: {
    editHospital(hospital: Hospital) {
      this.editedHospital = { ...hospital }; // Set the currently edited hospital
    },
    updateHospital() {
      // Emit an event to the parent component to handle the update operation
      this.$emit('update-hospital', this.editedHospital);
      // Reset edit mode after updating
      this.editedHospital = null;
    },
    cancelEdit() {
      // Cancel the editing process
      this.editedHospital = null;
    }
  }
});
</script> -->




<!-- <template>
  <div>
    <h2 class="text-violet-500 bg-gray-300 text-center text-xl font-semibold mb-4 py-3">Hospital List</h2>
    <ul>
      <li v-for="hospital in hospitals" :key="hospital.id">
        <div class="flex justify-between">
          <div>
            <p class="font-semibold">{{ hospital.name }}</p>
            <p>{{ hospital.address }}</p>
            <p>{{ hospital.phoneNumber }}</p>
            <p>{{ hospital.email }}</p>
          </div>
          <button @click="editHospital(hospital)" class="bg-green-500 text-white px-3 py-3 rounded-md hover:bg-green-600 transition-all duration-200">Edit</button>
        </div>
        <hr class="my-2 border-gray-300"> -->
<!-- Display the edit form if the current hospital is being edited -->
<!-- <div v-if="editedHospital && editedHospital.id === hospital.id">
          <form @submit.prevent="updateHospital" class="m-10">
            <input type="text" v-model="editedHospital.name" placeholder="Hospital Name">
            <input type="text" v-model="editedHospital.address" placeholder="Hospital Address">
            <input type="text" v-model="editedHospital.phoneNumber" placeholder="Hospital Phone Number">
            <input type="text" v-model="editedHospital.email" placeholder="Hospital Email">
            <button type="submit" class="px-3 bg-blue-400 text-white hover:bg-blue-600 rounded-md">Update</button>
            <button @click="cancelEdit" class="px-3 bg-red-400 text-white hover:bg-red-600 rounded-md">Cancel</button>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Hospital {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
} -->

<!-- export default defineComponent({
  props: {
    hospitals: {
      type: Array as () => Hospital[],
      required: true
    }
  },
  data() {
    return {
      editedHospital: null as Hospital | null // Track the currently edited hospital
    };
  },
  methods: {
    editHospital(hospital: Hospital) {
      this.editedHospital = { ...hospital }; // Set the currently edited hospital
    },
    updateHospital() {
      // logic to update the hospital details
      console.log('Updating hospital:', this.editedHospital);
      // Reset edit mode after updating
      this.editedHospital = null;
    },
    cancelEdit() {
      // Cancel the editing process
      this.editedHospital = null;
    }
  }
});
</script> -->



<!-- <template>
  <div>
    <h2 class="text-violet-500 text-xl font-semibold mb-4">Hospital List</h2>
    <ul>
      <li v-for="hospital in hospitals" :key="hospital.id">
        <div class="flex justify-between">
          <div>
            <p class="font-semibold">{{ hospital.name }}</p>
            <p>{{ hospital.address }}</p>
            <p>{{ hospital.phoneNumber }}</p>
          </div>
          <button @click="editHospital(hospital)" class="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-all duration-200">Edit</button>
        </div>
        <hr class="my-2 border-gray-300">
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    hospitals: {
      type: Array as PropType<{ id: number; name: string; address: string; phoneNumber: string }[]>,
      required: true
    }
  },
  methods: {
    editHospital(hospital: { id: number; name: string; address: string; phoneNumber: string }) {
      // Emit the 'edit-hospital' event with the selected hospital
      this.$emit('edit-hospital', hospital);
    }
  }
});
</script> -->





<!-- <template>
    <div class="container mx-auto p-4">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <div class="p-4">
          <h2 class="text-2xl font-semibold text-gray-800 mb-4">Hospital List</h2>
          <ul>
            <li v-for="hospital in hospitals" :key="hospital.id" class="border-b border-gray-200 py-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-semibold text-gray-900">{{ hospital.name }}</h3>
                  <p class="text-gray-600">{{ hospital.address }}</p>
                  <p class="text-gray-600">{{ hospital.phoneNumber }}</p>
                </div>
                <button @click="editHospital(hospital)" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all duration-200">Edit</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
import { defineComponent } from 'vue';

interface Hospital {
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
}

export default defineComponent({
  props: {
    hospitals: {
      type: Array as () => Hospital[],
      default: () => []
    }
  },
  methods: {
    editHospital(hospital: Hospital) {
      // Emit an event to notify the parent component that the hospital needs to be edited
      this.$emit('edit-hospital', hospital);
    }
  }
});
</script> -->