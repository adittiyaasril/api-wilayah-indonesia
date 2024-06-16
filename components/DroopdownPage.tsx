"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select, SelectItem } from "@nextui-org/select";
import { CircularProgress } from "@nextui-org/progress";

const DropdownPage: React.FC = () => {
  const [provinces, setProvinces] = useState<any[]>([]);
  const [regencies, setRegencies] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [villages, setVillages] = useState<any[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>("");
  const [selectedRegency, setSelectedRegency] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [selectedVillage, setSelectedVillage] = useState<string>("");
  const [loadingProvinces, setLoadingProvinces] = useState<boolean>(false);
  const [loadingRegencies, setLoadingRegencies] = useState<boolean>(false);
  const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false);
  const [loadingVillages, setLoadingVillages] = useState<boolean>(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        setLoadingProvinces(true);
        const response = await axios.get("/api/provinces");
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoadingProvinces(false);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchRegencies = async () => {
      if (selectedProvince !== "") {
        try {
          setLoadingRegencies(true);
          const response = await axios.get(
            `/api/regencies?provinceId=${selectedProvince}`
          );
          setRegencies(response.data);
        } catch (error) {
          console.error("Error fetching regencies:", error);
        } finally {
          setLoadingRegencies(false);
        }
      }
    };

    fetchRegencies();
  }, [selectedProvince]);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedRegency !== "") {
        try {
          setLoadingDistricts(true);
          const response = await axios.get(
            `/api/districts?regencyId=${selectedRegency}`
          );
          setDistricts(response.data);
        } catch (error) {
          console.error("Error fetching districts:", error);
        } finally {
          setLoadingDistricts(false);
        }
      }
    };

    fetchDistricts();
  }, [selectedRegency]);

  useEffect(() => {
    const fetchVillages = async () => {
      if (selectedDistrict !== "") {
        try {
          setLoadingVillages(true);
          const response = await axios.get(
            `/api/villages?districtId=${selectedDistrict}`
          );
          setVillages(response.data);
        } catch (error) {
          console.error("Error fetching villages:", error);
        } finally {
          setLoadingVillages(false);
        }
      }
    };

    fetchVillages();
  }, [selectedDistrict]);

  const handleProvinceChange = (e: any) => {
    setSelectedProvince(e.target.value);
    setSelectedRegency("");
    setSelectedDistrict("");
    setSelectedVillage("");
    setRegencies([]);
    setDistricts([]);
    setVillages([]);
  };

  const handleRegencyChange = (e: any) => {
    setSelectedRegency(e.target.value);
    setSelectedDistrict("");
    setSelectedVillage("");
    setDistricts([]);
    setVillages([]);
  };

  const handleDistrictChange = (e: any) => {
    setSelectedDistrict(e.target.value);
    setSelectedVillage("");
    setVillages([]);
  };

  const handleVillageChange = (e: any) => {
    setSelectedVillage(e.target.value);
  };

  return (
    <div>
      <h1 className="font-bold text-2xl text-center">API WILAYAH INDONESIA</h1>
      <div className="p-3">
        {loadingProvinces ? (
          <CircularProgress />
        ) : (
          <div>
            <label className="pl-2 px-2 font-bold">Provinsi:</label>
            <Select
              aria-label="Pilih Provinsi"
              placeholder="Pilih Provinsi"
              value={selectedProvince}
              onChange={handleProvinceChange}
            >
              {provinces.map((province) => (
                <SelectItem key={province.id} value={province.id}>
                  {province.name}
                </SelectItem>
              ))}
            </Select>
          </div>
        )}
      </div>
      {selectedProvince && (
        <div className="p-3">
          {loadingRegencies ? (
            <CircularProgress />
          ) : (
            <div>
              <label className="pl-2 px-2 font-bold">Kabupaten/Kota:</label>
              <Select
                aria-label="Pilih Kabupaten/Kota"
                placeholder="Pilih Kabupaten/Kota"
                value={selectedRegency}
                onChange={handleRegencyChange}
              >
                {regencies.map((regency) => (
                  <SelectItem key={regency.id} value={regency.id}>
                    {regency.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
        </div>
      )}
      {selectedRegency && (
        <div className="p-3">
          {loadingDistricts ? (
            <CircularProgress />
          ) : (
            <div>
              <label className="pl-2 px-2 font-bold">Kecamatan:</label>
              <Select
                aria-label="Pilih Kecamatan"
                placeholder="Pilih Kecamatan"
                value={selectedDistrict}
                onChange={handleDistrictChange}
              >
                {districts.map((district) => (
                  <SelectItem key={district.id} value={district.id}>
                    {district.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
        </div>
      )}
      {selectedDistrict && (
        <div className="p-3">
          {loadingVillages ? (
            <CircularProgress />
          ) : (
            <div>
              <label className="pl-2 px-2 font-bold">Kelurahan:</label>
              <Select
                aria-label="Pilih Kelurahan"
                placeholder="Pilih Kelurahan"
                value={selectedVillage}
                onChange={handleVillageChange}
              >
                {villages.map((village) => (
                  <SelectItem key={village.id} value={village.id}>
                    {village.name}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownPage;
