"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacilityService = void 0;
const facility_model_1 = require("./facility.model");
const createFacilityIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facility = yield facility_model_1.Facility.create(payload);
        return facility;
    }
    catch (error) {
        throw new Error(error);
    }
});
const getAllFacilitiesFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const facilities = yield facility_model_1.Facility.find({ isDeleted: false });
        return facilities;
    }
    catch (error) {
        throw new Error(error);
    }
});
const getSingleFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findById(id);
    return result;
});
const updateFacilityIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedFacilityData = __rest(payload, []);
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, updatedFacilityData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteFacilityFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield facility_model_1.Facility.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
    });
    return result;
});
exports.FacilityService = {
    createFacilityIntoDB,
    updateFacilityIntoDB,
    deleteFacilityFromDB,
    getAllFacilitiesFromDB,
    getSingleFacilityFromDB,
};
