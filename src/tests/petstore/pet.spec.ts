import { HTTP_STATUS } from '../../constants';
import { expect, test } from '../../fixtures/custom.fixture';
import { PetBuilder } from '../../petstore';

test.describe('Petstore - Pet CRUD', () => {
  let createdPetId: number | undefined;

  test.afterEach(async ({ petService }) => {
    if (createdPetId) {
      await petService.deletePet(createdPetId);
      createdPetId = undefined;
    }
  });

  /** ID: TC001 Tags: Smoke, API, Petstore */
  test('[TC001] @Smoke @Regression: Create new pet via POST /pet', async ({ petService }) => {
    const pet = PetBuilder.create()
      .category('Dog')
      .tag('friendly')
      .status('available')
      .build();

    const response = await petService.createPet(pet);

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body?.id).toBe(pet.id);
    expect(response.body?.name).toBe(pet.name);
    expect(response.body?.status).toBe('available');

    createdPetId = pet.id;
  });
});
