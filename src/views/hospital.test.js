import { expect, describe, it } from "vitest";
import { fetchHospitals, createHospital, updateHospital } from "./hospitals";

describe("Hospital functionality test suite", async () => {
  let hospitals; // Declare a variable to store fetched hospitals

  // Fetch hospitals before each test case
  beforeAll(async () => {
    hospitals = await fetchHospitals();
  });

  // Test if hospitals are fetched successfully
  it("should successfully fetch hospitals", () => {
    expect(hospitals).toBeTruthy();
    expect(hospitals.length).toBeGreaterThan(0);
  });

  // Test creating a new hospital
  it("should create a new hospital", async () => {
    const newHospital = {
      name: "Test Hospital",
      address: "123 Test St",
      phoneNumber: "123-456-7890",
      email: "test@example.com",
      state: "Test State",
      provider: "Test Provider",
    };
    const createdHospital = await createHospital(newHospital);
    expect(createdHospital).toBeTruthy();
    expect(createdHospital.id).toBeDefined();
    // Additional assertions as needed
  });

  // Test updating an existing hospital
  it("should update an existing hospital", async () => {
    // Assuming hospitals array contains at least one hospital
    const hospitalToUpdate = hospitals[0];
    const updatedHospitalData = { name: "Updated Hospital Name" };
    const updatedHospital = await updateHospital(hospitalToUpdate.id, updatedHospitalData);
    expect(updatedHospital).toBeTruthy();
    expect(updatedHospital.name).toBe(updatedHospitalData.name);
    // Additional assertions as needed
  });

  // Additional test cases can be added for other hospital functionality
});