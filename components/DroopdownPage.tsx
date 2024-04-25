"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "./Dropdown";

interface Province {
  id: string;
  name: string;
}

interface Regency {
  id: string;
  name: string;
}

interface District {
  id: string;
  name: string;
}

interface Village {
  id: string;
  name: string;
}

const DropdownPage: React.FC = () => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegency, setSelectedRegency] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get<Province[]>(
          "https://emsifa.github.io/api-wilayah-indonesia/api/provinces.json"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (selectedProvince !== "") {
      const fetchRegencies = async () => {
        try {
          const response = await axios.get<Regency[]>(
            `https://emsifa.github.io/api-wilayah-indonesia/api/regencies/${selectedProvince}.json`
          );
          setRegencies(response.data);
          setSelectedRegency("");
          setDistricts([]);
          setVillages([]);
        } catch (error) {
          console.error("Error fetching regencies:", error);
        }
      };

      fetchRegencies();
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedRegency !== "") {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get<District[]>(
            `https://emsifa.github.io/api-wilayah-indonesia/api/districts/${selectedRegency}.json`
          );
          setDistricts(response.data);
          setSelectedDistrict("");
          setVillages([]);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };

      fetchDistricts();
    }
  }, [selectedRegency]);

  useEffect(() => {
    if (selectedDistrict !== "") {
      const fetchVillages = async () => {
        try {
          const response = await axios.get<Village[]>(
            `https://emsifa.github.io/api-wilayah-indonesia/api/villages/${selectedDistrict}.json`
          );
          setVillages(response.data);
        } catch (error) {
          console.error("Error fetching villages:", error);
        }
      };

      fetchVillages();
    }
  }, [selectedDistrict]);

  return (
    <div>
      <Dropdown
        label="Provinsi"
        value={selectedProvince}
        onChange={(e) => setSelectedProvince(e.target.value)}
        options={provinces}
      />
      {selectedProvince && (
        <Dropdown
          label="Kabupaten/Kota"
          value={selectedRegency}
          onChange={(e) => setSelectedRegency(e.target.value)}
          options={regencies}
        />
      )}
      {selectedRegency && (
        <Dropdown
          label="Kecamatan"
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          options={districts}
        />
      )}
      {selectedDistrict && (
        <Dropdown
          label="Kelurahan"
          value=""
          onChange={() => {}}
          options={villages}
        />
      )}
    </div>
  );
};

export default DropdownPage;
