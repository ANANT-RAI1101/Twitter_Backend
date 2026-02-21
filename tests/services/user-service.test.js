import UserService from '../../src/services/user-service.js';
import UserRepository from "../../src/repository/user-repository.js"

jest.mock('../../src/repository/user-repository.js');

describe("signup test", () => {
    test("should signup a user", async () => {
        const data = {
            email: "abc@xyx.com",
            password: "12345678"
        };
            (UserRepository.prototype.create).mockReturnValue({
                ...data,
                createdAt: '2026-02-21',
                updatedAt: '2026-02-21'
            });
        const service = new UserService();
        const response = await service.signup();
        expect(response.email).toBe(data.email)
    })
})