export class ShopController {
	constructor($window, $location, shopService) {
		"ngInject";
		
		this._$window = $window;
        this._$location = $location;
		this._shopService = shopService;
		
		this.items = [];
		this.info = {};
		this.image = {};
		this.initDetail();
		
		this.getItems();
	}
	
	initDetail() {
		this.info = {
            store: {
				storeCode: "",
                storeName: "",
                businessType: "",
                individual: {
                    register: {
                        firstName: "",
                        lastName: "",
                        citizenID: "",
                        phone: "",
                        lineID: "",
                        email: "",
                        facebook: ""
                    },
                    contact: {
                        firstName: "",
                        lastName: "",
                        citizenID: "",
                        phone: "",
                        lineID: "",
                        email: "",
                        facebook: ""
                    },
                    document: {
                        citizenCard: "",
                        homeRegister: ""
                    }
                },
                company: {
                    register: {
                        companyPrefixName: "",
                        companyName: "",
                        taxID: "",
                        phone: "",
                        lineID: "",
                        email: "",
                        facebook: ""
                    },
                    contact: {
                        firstName: "",
                        lastName: "",
                        citizenID: "",
                        phone: "",
                        lineID: "",
                        email: "",
                        facebook: ""
                    },
                    document: {
                        companyCertificate: "",
                        tradeRegister: ""
                    }
                }
            },
            bank: {
                bankName: "",
                bankBranch: "",
                accountNumber: "",
                accountType: "",
                accountName: ""
            },
            address: {
                pickup: {
                    zipCode: "",
                    province: "",
                    amphur: "",
                    district: "",
                    other: ""
                },
                documentDrop: {
                    zipCode: "",
                    province: "",
                    amphur: "",
                    district: "",
                    other: ""
                }
            }
        };
		this.image = {
            individual: {
                citizenCard: "",
                homeRegister: ""
            },
            company: {
                companyCertificate: "",
                tradeRegister: ""
            }
        };
	}
	
	getItems() {
		this._shopService.getItems().then(
			(data) => {
				this.items = data;
			}
		);
	}
	
	getDetail(shopID) {
		this.initDetail();
		
		this._shopService.getDetail(shopID).then(
			(data) => {
				this.info = data;
							
				if (data.store.individual.document.citizenCard) {
					this.getStoreDocumentURL('individual', 'citizenCard');
				}
				if (data.store.individual.document.homeRegister) {
					this.getStoreDocumentURL('individual', 'homeRegister');
				}
				if (data.store.company.document.companyCertificate) {
					this.getStoreDocumentURL('company', 'companyCertificate');
				}
				if (data.store.company.document.tradeRegister) {
					this.getStoreDocumentURL('company', 'tradeRegister');
				}
			}
		);
	}
	
	getStoreDocumentURL(businessType, documentName) {
		this._shopService.getAWSS3URL(this.info.store[businessType].document[documentName])
            .then(
                (data) => {
					this.image[businessType][documentName] = data.awsS3URL;
                },
                (error) => {
                    alert(error.message);
                }
            );
	}
	
	summaryValue(value){
		return value? value: "-";
	}
	
	signout() {
		delete this._$window.localStorage.user;
        this._$location.path( '/');
	}
};