import type { ColumnType } from 'kysely';

export type Generated<T> =
	T extends ColumnType<infer S, infer I, infer U> ? ColumnType<S, I | undefined, U> : ColumnType<T, T | undefined, T>;

export interface ABS {
	Id: Generated<number>;
	Name: string;
}

export interface AdaptiveCruiseControl {
	Id: Generated<number>;
	Name: string;
}

export interface AdaptiveDrivingBeam {
	Id: Generated<number>;
	Name: string;
}

export interface AirBagLocations {
	Id: Generated<number>;
	Name: string;
}

export interface AirBagLocFront {
	Id: Generated<number>;
	Name: string;
}

export interface AirBagLocKnee {
	Id: Generated<number>;
	Name: string;
}

export interface AutoBrake {
	Id: Generated<number>;
	Name: string;
}

export interface AutomaticPedestrainAlertingSound {
	Id: Generated<number>;
	Name: string;
}

export interface AutoReverseSystem {
	Id: Generated<number>;
	Name: string;
}

export interface AxleConfiguration {
	Id: Generated<number>;
	Name: string;
}

export interface BatteryType {
	Id: Generated<number>;
	Name: string;
}

export interface BedType {
	Id: Generated<number>;
	Name: string;
}

export interface BlindSpotIntervention {
	Id: Generated<number>;
	Name: string;
}

export interface BlindSpotMonitoring {
	Id: Generated<number>;
	Name: string;
}

export interface BodyCab {
	Id: Generated<number>;
	Name: string;
}

export interface BodyStyle {
	Id: Generated<number>;
	Name: string;
}

export interface BrakeSystem {
	Id: Generated<number>;
	Name: string;
}

export interface BusFloorConfigType {
	Id: Generated<number>;
	Name: string;
}

export interface BusType {
	Id: Generated<number>;
	Name: string;
}

export interface CANAACN {
	Id: Generated<number>;
	Name: string;
}

export interface ChargerLevel {
	Id: Generated<number>;
	Name: string;
}

export interface Conversion {
	Formula: string;
	FromElementId: number;
	Id: Generated<number>;
	ToElementId: number;
}

export interface CoolingType {
	Id: Generated<number>;
	Name: string;
}

export interface Country {
	displayorder: Generated<number | null>;
	Id: Generated<number>;
	Name: string;
}

export interface CustomMotorcycleType {
	Id: Generated<number>;
	Name: string;
}

export interface DaytimeRunningLight {
	Id: Generated<number>;
	Name: string;
}

export interface DecodingOutput {
	AddedOn: Generated<Date>;
	AttributeId: string | null;
	Code: string | null;
	CreatedOn: Date | null;
	DataType: string | null;
	Decode: string | null;
	ElementId: number | null;
	GroupName: string | null;
	Id: Generated<number>;
	Keys: string | null;
	PatternId: number | null;
	Source: string | null;
	Value: string | null;
	Variable: string | null;
	VinSchemaId: number | null;
	WmiId: number | null;
}

export interface DefaultValue {
	CreatedOn: Generated<Date | null>;
	DefaultValue: string | null;
	ElementId: number;
	Id: Generated<number>;
	UpdatedOn: Date | null;
	VehicleTypeId: number;
}

export interface DestinationMarket {
	Id: Generated<number>;
	Name: string;
}

export interface DriveType {
	Id: Generated<number>;
	Name: string;
}

export interface DynamicBrakeSupport {
	Id: Generated<number>;
	Name: string;
}

export interface ECS {
	Id: Generated<number>;
	Name: string;
}

export interface EDR {
	Id: Generated<number>;
	Name: string;
}

export interface ElectrificationLevel {
	Id: Generated<number>;
	Name: string;
}

export interface Element {
	Code: string | null;
	DataType: string | null;
	Decode: string | null;
	Description: string | null;
	GroupName: string | null;
	Id: number;
	IsPrivate: boolean | null;
	IsQS: boolean | null;
	LookupTable: string | null;
	MaxAllowedValue: number | null;
	MinAllowedValue: number | null;
	Name: string;
	weight: number | null;
}

export interface EngineConfiguration {
	Id: Generated<number>;
	Name: string;
}

export interface EngineModel {
	Description: string | null;
	Id: Generated<number>;
	Name: string;
}

export interface EngineModelPattern {
	AttributeId: string;
	CreatedOn: Generated<Date | null>;
	ElementId: number;
	EngineModelId: number;
	Id: Generated<number>;
	UpdatedOn: Date | null;
}

export interface EntertainmentSystem {
	Id: Generated<number>;
	Name: string;
}

export interface ErrorCode {
	AdditionalErrorText: string | null;
	Id: Generated<number>;
	Name: string;
	weight: number | null;
}

export interface EVDriveUnit {
	Id: Generated<number>;
	Name: string;
}

export interface ForwardCollisionWarning {
	Id: Generated<number>;
	Name: string;
}

export interface FuelDeliveryType {
	Id: Generated<number>;
	Name: string;
}

export interface FuelType {
	Id: Generated<number>;
	Name: string;
}

export interface GrossVehicleWeightRating {
	Id: Generated<number>;
	MaxRangeWeight: number | null;
	MinRangeWeight: number | null;
	Name: string;
	SortOrder: number | null;
}

export interface KeylessIgnition {
	Id: Generated<number>;
	Name: string;
}

export interface LaneCenteringAssistance {
	Id: Generated<number>;
	Name: string;
}

export interface LaneDepartureWarning {
	Id: Generated<number>;
	Name: string;
}

export interface LaneKeepSystem {
	Id: Generated<number>;
	Name: string;
}

export interface LowerBeamHeadlampLightSource {
	Id: Generated<number>;
	Name: string;
}

export interface Make {
	CreatedOn: Generated<Date | null>;
	Id: Generated<number>;
	Name: string;
	UpdatedOn: Date | null;
}

export interface MakeModel {
	CreatedOn: Generated<Date | null>;
	Id: Generated<number>;
	MakeId: number;
	ModelId: number;
	UpdatedOn: Date | null;
}

export interface Manufacturer {
	Id: Generated<number>;
	Name: string;
}

export interface ManufacturerMake {
	Id: Generated<number>;
	MakeId: number;
	ManufacturerId: number;
}

export interface Model {
	CreatedOn: Generated<Date | null>;
	Id: Generated<number>;
	Name: string;
	UpdatedOn: Date | null;
}

export interface MotorcycleChassisType {
	Id: Generated<number>;
	Name: string;
}

export interface MotorcycleSuspensionType {
	Id: Generated<number>;
	Name: string;
}

export interface NonLandUse {
	Id: Generated<number>;
	Name: string;
}

export interface ParkAssist {
	Id: Generated<number>;
	Name: string;
}

export interface Pattern {
	AttributeId: string;
	CreatedOn: Generated<Date | null>;
	ElementId: number;
	Id: Generated<number>;
	Keys: string;
	UpdatedOn: Date | null;
	VinSchemaId: number;
}

export interface PedestrianAutomaticEmergencyBraking {
	Id: Generated<number>;
	Name: string;
}

export interface Pretensioner {
	Id: Generated<number>;
	Name: string;
}

export interface RearAutomaticEmergencyBraking {
	Id: Generated<number>;
	Name: string;
}

export interface RearCrossTrafficAlert {
	Id: Generated<number>;
	Name: string;
}

export interface RearVisibilityCamera {
	Id: Generated<number>;
	Name: string;
}

export interface SeatBeltsAll {
	Id: Generated<number>;
	Name: string;
}

export interface SemiautomaticHeadlampBeamSwitching {
	Id: Generated<number>;
	Name: string;
}

export interface Steering {
	Id: Generated<number>;
	Name: string;
}

export interface TPMS {
	Id: Generated<number>;
	Name: string;
}

export interface TractionControl {
	Id: Generated<number>;
	Name: string;
}

export interface TrailerBodyType {
	Id: Generated<number>;
	Name: string;
}

export interface TrailerType {
	Id: Generated<number>;
	Name: string;
}

export interface Transmission {
	Id: Generated<number>;
	Name: string;
}

export interface Turbo {
	Id: Generated<number>;
	Name: string;
}

export interface ValvetrainDesign {
	Id: Generated<number>;
	Name: string;
}

export interface VehicleSpecPattern {
	AttributeId: string;
	CreatedOn: Generated<Date | null>;
	ElementId: number;
	Id: Generated<number>;
	IsKey: Generated<boolean>;
	UpdatedOn: Date | null;
	VSpecSchemaPatternId: number;
}

export interface VehicleSpecSchema {
	CreatedOn: Generated<Date>;
	Description: string | null;
	Id: Generated<number>;
	MakeId: number;
	Source: string | null;
	SourceDate: Date | null;
	TobeQCed: boolean | null;
	UpdatedOn: Date | null;
	URL: string | null;
	VehicleTypeId: number | null;
}

export interface VehicleSpecSchemaModel {
	Id: Generated<number>;
	ModelId: number;
	VehicleSpecSchemaId: number;
}

export interface VehicleSpecSchemaYear {
	Id: Generated<number>;
	VehicleSpecSchemaId: number;
	Year: number;
}

export interface VehicleType {
	Description: string | null;
	DisplayOrder: number | null;
	FormType: number | null;
	Id: Generated<number>;
	IncludeInEquipPlant: boolean | null;
	Name: string;
}

export interface VinDescriptor {
	CreatedOn: Generated<Date | null>;
	Descriptor: string;
	Id: Generated<number>;
	ModelYear: number;
	UpdatedOn: Date | null;
}

export interface VinException {
	CheckDigit: Generated<boolean>;
	CreatedOn: Generated<Date | null>;
	Id: Generated<number>;
	UpdatedOn: Date | null;
	VIN: string;
}

export interface VinSchema {
	CreatedOn: Date | null;
	Id: Generated<number>;
	Name: string;
	Notes: string | null;
	sourcewmi: string | null;
	TobeQCed: boolean | null;
	UpdatedOn: Date | null;
}

export interface VNCSABodyType {
	Id: number;
	Name: string | null;
}

export interface VNCSAMake {
	Id: number;
	Name: string | null;
}

export interface VNCSAModel {
	Id: number | null;
	MakeId: number;
	Name: string | null;
	OriginalId: number;
}

export interface VSpecSchemaPattern {
	Id: Generated<number>;
	SchemaId: number;
}

export interface WheelBaseType {
	Id: Generated<number>;
	Name: string;
}

export interface Wmi {
	CountryId: number | null;
	CreatedOn: Generated<Date | null>;
	Id: Generated<number>;
	MakeId: number | null;
	ManufacturerId: number | null;
	NonCompliant: Generated<boolean | null>;
	NonCompliantReason: string | null;
	NonCompliantSetByOVSC: Generated<boolean | null>;
	ProcessedOn: Date | null;
	PublicAvailabilityDate: Date | null;
	TruckTypeId: number | null;
	UpdatedOn: Date | null;
	VehicleTypeId: number | null;
	Wmi: string;
}

export interface WmiMake {
	MakeId: number;
	WmiId: number;
}

export interface WmiVinSchema {
	Id: Generated<number>;
	OrgId: number | null;
	VinSchemaId: number;
	WmiId: number;
	YearFrom: number;
	YearTo: number | null;
}

export interface WMIYearValidChars {
	Char: string | null;
	id: Generated<number>;
	Position: number | null;
	WMI: string;
	Year: number;
}

export interface WMIYearValidCharsCacheExceptions {
	CreatedOn: Generated<Date>;
	Id: Generated<number>;
	WMI: string;
}

export interface vPICList_Lite1 {
	ABS: ABS;
	AdaptiveCruiseControl: AdaptiveCruiseControl;
	AdaptiveDrivingBeam: AdaptiveDrivingBeam;
	AirBagLocations: AirBagLocations;
	AirBagLocFront: AirBagLocFront;
	AirBagLocKnee: AirBagLocKnee;
	AutoBrake: AutoBrake;
	AutomaticPedestrainAlertingSound: AutomaticPedestrainAlertingSound;
	AutoReverseSystem: AutoReverseSystem;
	AxleConfiguration: AxleConfiguration;
	BatteryType: BatteryType;
	BedType: BedType;
	BlindSpotIntervention: BlindSpotIntervention;
	BlindSpotMonitoring: BlindSpotMonitoring;
	BodyCab: BodyCab;
	BodyStyle: BodyStyle;
	BrakeSystem: BrakeSystem;
	BusFloorConfigType: BusFloorConfigType;
	BusType: BusType;
	CAN_AACN: CANAACN;
	ChargerLevel: ChargerLevel;
	Conversion: Conversion;
	CoolingType: CoolingType;
	Country: Country;
	CustomMotorcycleType: CustomMotorcycleType;
	DaytimeRunningLight: DaytimeRunningLight;
	DecodingOutput: DecodingOutput;
	DefaultValue: DefaultValue;
	DestinationMarket: DestinationMarket;
	DriveType: DriveType;
	DynamicBrakeSupport: DynamicBrakeSupport;
	ECS: ECS;
	EDR: EDR;
	ElectrificationLevel: ElectrificationLevel;
	Element: Element;
	EngineConfiguration: EngineConfiguration;
	EngineModel: EngineModel;
	EngineModelPattern: EngineModelPattern;
	EntertainmentSystem: EntertainmentSystem;
	ErrorCode: ErrorCode;
	EVDriveUnit: EVDriveUnit;
	ForwardCollisionWarning: ForwardCollisionWarning;
	FuelDeliveryType: FuelDeliveryType;
	FuelType: FuelType;
	GrossVehicleWeightRating: GrossVehicleWeightRating;
	KeylessIgnition: KeylessIgnition;
	LaneCenteringAssistance: LaneCenteringAssistance;
	LaneDepartureWarning: LaneDepartureWarning;
	LaneKeepSystem: LaneKeepSystem;
	LowerBeamHeadlampLightSource: LowerBeamHeadlampLightSource;
	Make: Make;
	Make_Model: MakeModel;
	Manufacturer: Manufacturer;
	Manufacturer_Make: ManufacturerMake;
	Model: Model;
	MotorcycleChassisType: MotorcycleChassisType;
	MotorcycleSuspensionType: MotorcycleSuspensionType;
	NonLandUse: NonLandUse;
	ParkAssist: ParkAssist;
	Pattern: Pattern;
	PedestrianAutomaticEmergencyBraking: PedestrianAutomaticEmergencyBraking;
	Pretensioner: Pretensioner;
	RearAutomaticEmergencyBraking: RearAutomaticEmergencyBraking;
	RearCrossTrafficAlert: RearCrossTrafficAlert;
	RearVisibilityCamera: RearVisibilityCamera;
	SeatBeltsAll: SeatBeltsAll;
	SemiautomaticHeadlampBeamSwitching: SemiautomaticHeadlampBeamSwitching;
	Steering: Steering;
	TPMS: TPMS;
	TractionControl: TractionControl;
	TrailerBodyType: TrailerBodyType;
	TrailerType: TrailerType;
	Transmission: Transmission;
	Turbo: Turbo;
	ValvetrainDesign: ValvetrainDesign;
	VehicleSpecPattern: VehicleSpecPattern;
	VehicleSpecSchema: VehicleSpecSchema;
	VehicleSpecSchema_Model: VehicleSpecSchemaModel;
	VehicleSpecSchema_Year: VehicleSpecSchemaYear;
	VehicleType: VehicleType;
	VinDescriptor: VinDescriptor;
	VinException: VinException;
	VinSchema: VinSchema;
	vNCSABodyType: VNCSABodyType;
	vNCSAMake: VNCSAMake;
	vNCSAModel: VNCSAModel;
	VSpecSchemaPattern: VSpecSchemaPattern;
	WheelBaseType: WheelBaseType;
	Wmi: Wmi;
	Wmi_Make: WmiMake;
	Wmi_VinSchema: WmiVinSchema;
	WMIYearValidChars: WMIYearValidChars;
	WMIYearValidChars_CacheExceptions: WMIYearValidCharsCacheExceptions;
}
