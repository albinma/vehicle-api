import { beforeAll, describe, expect, it } from 'bun:test';
import { App } from 'src';
import { SearchByVinError } from 'src/domain/errors/search-by-vin.error';
import { createApp } from 'src/setup';

const baseUrl = 'http://localhost/api/v1';

describe('GET /vin/:vin', () => {
	let app: App;
	const resourceUrl = `${baseUrl}/vin`;

	beforeAll(() => {
		app = createApp();
	});

	it('should respond with 200 Ok - vehicle found', async () => {
		// Arrange
		const vin = '5TEWN72N82Z891171';
		const request = new Request(`${resourceUrl}/${vin}`);
		const expectedBody = {
			vin: '5TEWN72N82Z891171',
			suggestedVIN: null,
			makeId: 448,
			make: 'Toyota',
			modelId: 2223,
			model: 'Tacoma',
			year: 2002,
			attributes: {
				vehicleDescriptor: '5TEWN72N*2Z',
				manufacturer: 'TOYOTA MOTOR MANUFACTURING, CALIFORNIA, INC.',
				manufacturerId: 1063,
				plantCity: 'FREMONT',
				series: 'RZN171L/VZN170L',
				trim: 'DELUXE',
				vehicleType: 'TRUCK',
				vehicleTypeId: 3,
				plantCountry: 'UNITED STATES (USA)',
				plantCountryId: 6,
				plantCompanyName: 'New United Motor Manufacturing (NUMMI)',
				plantState: 'CALIFORNIA',
				note: 'Extra Cab',
				bodyClass: 'Pickup',
				bodyClassId: 60,
				wheelBaseType: 'Extra Long',
				wheelBaseTypeId: 4,
				gvwr: 'Class 1D: 5,001 - 6,000 lb (2,268 - 2,722 kg)',
				gvwrId: 13,
				bodyCabType: 'Extra/Super/Quad/Double/King/Extended',
				bodyCabTypeId: 2,
				trailerType: 'Not Applicable',
				trailerTypeId: 0,
				trailerBodyType: 'Not Applicable',
				trailerBodyTypeId: 0,
				driveType: '4WD/4-Wheel Drive/4x4',
				driveTypeId: 2,
				brakeSystemType: 'Hydraulic',
				brakeSystemTypeId: 2,
				engineCylinders: 6,
				displacementCc: 3378,
				displacementCi: 207.48072992208,
				displacementL: 3.4,
				engineModel: '5VZ-FE',
				fuelTypePrimary: 'Gasoline',
				fuelTypePrimaryId: 4,
				engineConfiguration: 'V-Shaped',
				engineConfigurationId: 2,
				engineHp: 190,
				coolingType: 'Water',
				coolingTypeId: 2,
				engineHpTo: 190,
				engineManufacturer: 'Toyota',
				busFloorConfigType: 'Not Applicable',
				busFloorConfigTypeId: 0,
				busType: 'Not Applicable',
				busTypeId: 0,
				customMotorcycleType: 'Not Applicable',
				customMotorcycleTypeId: 0,
				motorcycleSuspensionType: 'Not Applicable',
				motorcycleSuspensionTypeId: 0,
				motorcycleChassisType: 'Not Applicable',
				motorcycleChassisTypeId: 0,
			},
		};

		// Act
		const response = await app.handle(request);

		// Assert
		expect(response.status).toBe(200);

		const body = await response.json();
		expect(body).toMatchObject(expectedBody);
	});

	it('should respond with 400 Bad request - invalid vin', async () => {
		// Arrange
		const vin = '5TEWN72N82Z89117'; // missing a digit
		const request = new Request(`${resourceUrl}/${vin}`);

		// Act
		const response = await app.handle(request);

		// Assert
		expect(response.status).toBe(400);
	});

	it('should respond with 422 Unprocessable entity - wrong vin', async () => {
		// Arrange
		const vin = '5TEWN72N82Z891172'; // wrong last digit
		const request = new Request(`${resourceUrl}/${vin}`);
		const expectedBody = {
			code: SearchByVinError.name,
			message: 'Failed to decode VIN',
			data: {
				vin,
			},
		};

		// Act
		const response = await app.handle(request);

		// Assert
		expect(response.status).toBe(422);
		const body = await response.json();

		expect(body).toMatchObject(expectedBody);
	});
});
